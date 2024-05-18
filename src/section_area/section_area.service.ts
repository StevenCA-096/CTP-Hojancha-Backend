import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSectionAreaDto } from './dto/create-section_area.dto';
import { UpdateSectionAreaDto } from './dto/update-section_area.dto';
import { SectionArea } from './entities/section_area.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaService } from 'src/area/area.service';
import { SectionService } from 'src/section/section.service';

@Injectable()
export class SectionAreaService {

  constructor(
    @InjectRepository(SectionArea)
    private sectionAreaRepository: Repository<SectionArea>,
    private sectionService: SectionService,
    private areaService: AreaService

  ){}

  async create(createSectionAreaDto: CreateSectionAreaDto) {
    const sectionFound = await this.sectionService.findOne(createSectionAreaDto.sectionId)
    const areaFound = await this.areaService.findOne(createSectionAreaDto.areaId)

    if(!sectionFound) throw new HttpException('Section not found', HttpStatus.NOT_FOUND)
    if(!areaFound) throw new HttpException('Area not found', HttpStatus.NOT_FOUND)

    return await this.sectionAreaRepository.save({...createSectionAreaDto, section: sectionFound, area: areaFound});
  }

  async findAll() {
    return await this.sectionAreaRepository.find({
      relations: {section: true, area: true},
  });
  }

  async findOne(id: number) {
    const Found = await this.sectionAreaRepository.findOne({
    where: {id}, relations: {section: true, area: true}});
    if(!Found) throw new HttpException(`SectionArea with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return Found;
  }
  
  async remove(id: number) {
    const Found = await this.sectionAreaRepository.findOneBy({id});
    if(!Found) throw new HttpException(`SectionArea with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.sectionAreaRepository.delete(id);
  }

}
