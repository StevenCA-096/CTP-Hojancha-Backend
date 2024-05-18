import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentEnrollmentService } from './student_enrollment.service';
import { CreateStudentEnrollmentDto } from './dto/create-student_enrollment.dto';
import { UpdateStudentEnrollmentDto } from './dto/update-student_enrollment.dto';

@Controller('student-enrollment')
export class StudentEnrollmentController {
  constructor(private readonly studentEnrollmentService: StudentEnrollmentService) {}

  @Post()
  create(@Body() createStudentEnrollmentDto: CreateStudentEnrollmentDto) {
    return this.studentEnrollmentService.create(createStudentEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.studentEnrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentEnrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentEnrollmentDto: UpdateStudentEnrollmentDto) {
    return this.studentEnrollmentService.update(+id, updateStudentEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentEnrollmentService.remove(+id);
  }
}
