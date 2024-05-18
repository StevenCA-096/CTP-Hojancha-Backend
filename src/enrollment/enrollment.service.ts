import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnrollmentService {

  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ){}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const newEnrollment = this.enrollmentRepository.create(createEnrollmentDto);
    return await this.enrollmentRepository.save(newEnrollment);
  }

  async findAll() {
    return await this.enrollmentRepository.find({
      relations: {sections: true},
  });
  }

  async findOne(id: number) {
    const enrollmentFound = await this.enrollmentRepository.findOne({
      where: {id}, relations: {sections: true}});
    if (!enrollmentFound) throw new HttpException(`Enrollment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return enrollmentFound;
  }
  
  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    const enrollmentFound = await this.enrollmentRepository.findOneBy({id});
    if (!enrollmentFound) throw new HttpException(`Enrollment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.enrollmentRepository.update(id, updateEnrollmentDto);
    return await this.enrollmentRepository.findOneBy({id});
  }

  async remove(id: number) {
    const enrollmentFound = await this.enrollmentRepository.findOneBy({id});
    if (!enrollmentFound) throw new HttpException(`Enrollment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.enrollmentRepository.delete(id);
  }
}
