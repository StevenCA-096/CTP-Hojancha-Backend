import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentEnrollmentDto } from './dto/create-student_enrollment.dto';
import { UpdateStudentEnrollmentDto } from './dto/update-student_enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEnrollment } from './entities/student_enrollment.entity';
import { StudentService } from 'src/student/student.service';
import { AppointmentService } from 'src/appointment/appointment.service';
import { SectionService } from 'src/section/section.service';

@Injectable()
export class StudentEnrollmentService {

  constructor(
    @InjectRepository(StudentEnrollment)
    private studentEnrollmentRepository: Repository<StudentEnrollment>,
    private studentService: StudentService,
    private sectionService: SectionService,
    private appointmentService: AppointmentService

  ){}

  async create(createStudentEnrollmentDto: CreateStudentEnrollmentDto) {
    const studentFound = await this.studentService.findOne(createStudentEnrollmentDto.studentId)
    const sectionFound = await this.sectionService.findOne(createStudentEnrollmentDto.sectionId)
    const appointmentFound = await this.appointmentService.findOne(createStudentEnrollmentDto.appointmentId)

    if(!studentFound) throw new HttpException('Student not found', HttpStatus.NOT_FOUND)
    if(!sectionFound) throw new HttpException('Section not found', HttpStatus.NOT_FOUND)
    if(!appointmentFound) throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND)
      
    return await this.studentEnrollmentRepository.save({...createStudentEnrollmentDto, student: studentFound, section: sectionFound, appointment: appointmentFound});
  }

  async findAll() {
    return await this.studentEnrollmentRepository.find({
      relations: {student: true, section: true, appointment: true},
  });
  }

  async findOne(id: number) {
    const studentEnrollmentFound = await this.studentEnrollmentRepository.findOne({
    where: {id}, relations:  {student: true, section: true, appointment: true}});
    if(!studentEnrollmentFound) throw new HttpException(`StudentEnrollment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return studentEnrollmentFound;
  }

  async update(id: number, updateStudentEnrollmentDto: UpdateStudentEnrollmentDto) {
    const studentEnrollmentFound = await this.studentEnrollmentRepository.findOneBy({id})
    if(!studentEnrollmentFound) throw new HttpException('StudentEnrollment not found', HttpStatus.NOT_FOUND)
    await this.studentEnrollmentRepository.update(id, updateStudentEnrollmentDto);
    return await this.studentEnrollmentRepository.findOneBy({id});
  }

  async remove(id: number) {
    const studentEnrollmentFound = await this.studentEnrollmentRepository.findOneBy({id});
    if(!studentEnrollmentFound) throw new HttpException(`StudentEnrollment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.studentEnrollmentRepository.delete(id);
  }
}
