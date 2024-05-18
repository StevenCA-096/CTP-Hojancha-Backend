import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { Responsible } from './entities/responsible.entity'; 
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class ResponsibleService {

  constructor(
    @InjectRepository(Responsible)
    private responsibleRepository: Repository<Responsible>,
    private studentService: StudentService
  ){}

  async create(createResponsibleDto: CreateResponsibleDto) {
    const studentFound = await this.studentService.findOne(createResponsibleDto.studentId)
    if(!studentFound) throw new HttpException('Student not found', HttpStatus.NOT_FOUND)
    return await this.responsibleRepository.save({...createResponsibleDto, student: studentFound});
  }

  async findAll() {
    return await this.responsibleRepository.find({
      relations: {student: true},
  });
  }

  async findOne(id: number) {
    const responsibleFound = await this.responsibleRepository.findOne({
    where: {id}, relations: {student: true}});
    if(!responsibleFound) throw new HttpException(`Responsible with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return responsibleFound;
  }

  async update(id: number, updateResponsibleDto: UpdateResponsibleDto) {
    const responsibleFound = await this.responsibleRepository.findOneBy({id});
    if(!responsibleFound) throw new HttpException(`Responsible with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.responsibleRepository.update(id, updateResponsibleDto);
    return await this.responsibleRepository.findOneBy({id});
  }

  async remove(id: number) {
    const responsibleFound = await this.responsibleRepository.findOneBy({id});
    if(!responsibleFound) throw new HttpException(`Responsible with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.responsibleRepository.delete(id);
  }
}
