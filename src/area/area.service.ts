import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AreaService {

  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ){}

  async create(createAreaDto: CreateAreaDto) {
    const newArea = this.areaRepository.create(createAreaDto);
    return await this.areaRepository.save(newArea);
  }

  async findAll() {
    return await this.areaRepository.find({
      relations: {sectionareas: true},
  });
  }

  async findOne(id: number) {
    const areaFound = await this.areaRepository.findOne({
      where: {id}, relations: {sectionareas: true}});
    if (!areaFound) throw new HttpException(`Area with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return areaFound;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    const areaFound = await this.areaRepository.findOneBy({id});
    if (!areaFound) throw new HttpException(`Area with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.areaRepository.update(id, updateAreaDto);
    return await this.areaRepository.findOneBy({id});
  }

  async remove(id: number) {
    const areaFound = await this.areaRepository.findOneBy({id});
    if (!areaFound) throw new HttpException(`Area with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.areaRepository.delete(id);
  }
}
