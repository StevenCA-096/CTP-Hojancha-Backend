import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ){}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto)
    return await this.studentRepository.save(newStudent)
  }

  async findAll() {
    return await this.studentRepository.find({
      relations: {responsibles: true},
  });
  }

  async findOne(id: number) {
    const studentFound = await this.studentRepository.findOne({
    where: {id}, relations: {responsibles: true}});
    if(!studentFound) throw new HttpException(`Student with ID ${id} not found`, HttpStatus.NOT_FOUND)
    return studentFound;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const studentFound = await this.studentRepository.findOneBy({id})
    if(!studentFound) throw new HttpException(`Student with ID ${id} not found`, HttpStatus.NOT_FOUND)
    await this.studentRepository.update(id, updateStudentDto)
    return await this.studentRepository.findOneBy({id})
  }

  async remove(id: number) {
    const studentFound = await this.studentRepository.findOneBy({id})
    if(!studentFound) throw new HttpException(`Student with ID ${id} not found`, HttpStatus.NOT_FOUND)
    return await this.studentRepository.delete(id);
  }
}
