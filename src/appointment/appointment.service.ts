import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity'; 
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CounterService } from 'src/counter/counter.service';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private counterService: CounterService
  ){}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const counterFound = await this.counterService.findOne(createAppointmentDto.counterId)
    if(!counterFound) throw new HttpException('Counter not found', HttpStatus.NOT_FOUND)
    return await this.appointmentRepository.save({...createAppointmentDto, counter: counterFound});
  }

  async findAll() {
    return await this.appointmentRepository.find({
      relations: {studentEnrollment: true},
  });
  }

  async findOne(id: number) {
    const appointmentFound = await this.appointmentRepository.findOne({
    where: {id}, relations: {studentEnrollment: true}});
    if(!appointmentFound) throw new HttpException(`Appointment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return appointmentFound;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointmentFound = await this.appointmentRepository.findOneBy({ id });
    if(!appointmentFound) throw new HttpException(`Appointment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return await this.appointmentRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const appointmentFound = await this.appointmentRepository.findOneBy({ id });
    if(!appointmentFound) throw new HttpException(`Appointment with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return await this.appointmentRepository.delete(id);
  }
}
