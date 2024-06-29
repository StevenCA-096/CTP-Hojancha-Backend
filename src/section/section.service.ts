import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Injectable()
export class SectionService {

  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    private enrollmentService: EnrollmentService
  ) { }

  async create(createSectionDto: CreateSectionDto) {
    const enrollmentFound = await this.enrollmentService.findOne(createSectionDto.enrollmentId)
    if (!enrollmentFound) throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND)
    return await this.sectionRepository.save({ ...createSectionDto, enrollment: enrollmentFound });
  }

  async findAll() {
    return await this.sectionRepository.find({
      relations: { enrollment: true },
    });
  }

  async findOne(id: number) {
    const sectionFound = await this.sectionRepository.findOne({
      where: { id }, relations: { enrollment: true }
    });
    if (!sectionFound) throw new HttpException(`Section with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return sectionFound;
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    const sectionFound = await this.sectionRepository.findOneBy({ id });
    if (!sectionFound) throw new HttpException(`Section with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.sectionRepository.update(id, updateSectionDto);
    return await this.sectionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const sectionFound = await this.sectionRepository.findOneBy({ id });
    if (!sectionFound) throw new HttpException(`Section with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.sectionRepository.delete(id);
  }

  async reduceQuota(id: number) {
    const sectionFound = await this.sectionRepository.findOneBy({ id });

    if (!sectionFound) throw new HttpException(`Section with ID ${id} not found`, HttpStatus.NOT_FOUND);

    if (sectionFound) {
      if (sectionFound.quota > 0) {
        sectionFound.quota = sectionFound.quota - 1;
        try {
          return await this.sectionRepository.save(sectionFound)
        } catch (error) {
          throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
      } else {
        throw new HttpException(`Section ${sectionFound.name} have no quota`, HttpStatus.CONFLICT);
      }

    }
  }

  async addQuota(id: number) {
    const sectionFound = await this.sectionRepository.findOneBy({ id });
    if (!sectionFound) throw new HttpException(`Section with ID ${id} not found`, HttpStatus.NOT_FOUND);

    if (sectionFound) {
      sectionFound.quota = sectionFound.quota + 1;
      return await this.sectionRepository.save(sectionFound);
    }
  }
}
