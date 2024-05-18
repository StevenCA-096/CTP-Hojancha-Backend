import { IsDateString, IsNumber, IsNotEmpty} from 'class-validator';

export class CreateEnrollmentDto {

    @IsNotEmpty()
    @IsNumber()
    grade: number;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsDateString() 
    startDate: Date;

    @IsNotEmpty()
    @IsDateString() 
    finishDate: Date;
}
