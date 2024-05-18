import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterModule } from 'src/counter/counter.module';

@Module({
  imports:[TypeOrmModule.forFeature([Appointment]), CounterModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [TypeOrmModule, AppointmentService]
})
export class AppointmentModule {}
