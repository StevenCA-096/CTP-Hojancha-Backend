import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ResponsibleModule } from './responsible/responsible.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AreaModule } from './area/area.module';
import { SectionModule } from './section/section.module';
import { SectionAreaModule } from './section_area/section_area.module';
import { CounterModule } from './counter/counter.module';
import { AppointmentModule } from './appointment/appointment.module';
import { StudentEnrollmentModule } from './student_enrollment/student_enrollment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: 
  [StudentModule, 
  ResponsibleModule, 
  EnrollmentModule, 
  AreaModule, 
  SectionModule, 
  SectionAreaModule, 
  CounterModule, 
  AppointmentModule, 
  StudentEnrollmentModule,
  TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pruebactp',
      entities: [join(__dirname, '**', '*.entity.js')],
      synchronize: true, 
      retryAttempts: 3,
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
