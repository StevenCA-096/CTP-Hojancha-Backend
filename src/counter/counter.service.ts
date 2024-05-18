import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { Counter } from './entities/counter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Injectable()
export class CounterService {

  constructor(
    @InjectRepository(Counter)
    private counterRepository: Repository<Counter>,
    private enrollmentService: EnrollmentService
  ){}

  async create(createCounterDto: CreateCounterDto) {
    const enrollmentFound = await this.enrollmentService.findOne(createCounterDto.enrollmentId)
    if(!enrollmentFound) throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND)
    return await this.counterRepository.save({...createCounterDto, enrollment: enrollmentFound});
  }

  async findAll() {
    return await this.counterRepository.find({
      relations: {appointments: true},
  });
  }

  async findOne(id: number) {
    const counterFound = await this.counterRepository.findOne({
      where: {id}, relations: {appointments: true}});
    if (!counterFound) throw new HttpException(`Counter with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return counterFound;
  }

  async update(id: number, updateCounterDto: UpdateCounterDto) {
    const counterFound = await this.counterRepository.findOneBy({ id });
    if (!counterFound) throw new HttpException(`Counter with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.counterRepository.update(id, updateCounterDto);
    return await this.counterRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const counterFound = await this.counterRepository.findOneBy({ id });
    if (!counterFound) throw new HttpException(`Counter with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.counterRepository.delete(id);
  }
}
