import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateStudentEnrollmentDto {

    @IsNotEmpty()
    @IsBoolean()
    isRecursing: boolean;

    @IsNotEmpty()
    @IsNumber()
    studentId: number;

    @IsNotEmpty()
    @IsNumber()
    sectionId: number;

    @IsNotEmpty()
    @IsNumber()
    appointmentId: number;

}
