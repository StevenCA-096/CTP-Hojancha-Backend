import { Module } from '@nestjs/common';
import { StudentEnrollmentService } from './student_enrollment.service';
import { StudentEnrollmentController } from './student_enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEnrollment } from './entities/student_enrollment.entity';
import { StudentModule } from 'src/student/student.module';
import { SectionModule } from 'src/section/section.module';
import { AppointmentModule } from 'src/appointment/appointment.module';

@Module({
  imports:[TypeOrmModule.forFeature([StudentEnrollment]), StudentModule, SectionModule, AppointmentModule],
  controllers: [StudentEnrollmentController],
  providers: [StudentEnrollmentService],
  exports: [TypeOrmModule, StudentEnrollmentService]
})
export class StudentEnrollmentModule {}
