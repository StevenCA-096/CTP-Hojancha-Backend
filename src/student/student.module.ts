import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule, StudentService]
})
export class StudentModule {}
