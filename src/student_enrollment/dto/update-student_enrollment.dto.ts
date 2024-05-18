import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentEnrollmentDto } from './create-student_enrollment.dto';

export class UpdateStudentEnrollmentDto extends PartialType(CreateStudentEnrollmentDto) {}
