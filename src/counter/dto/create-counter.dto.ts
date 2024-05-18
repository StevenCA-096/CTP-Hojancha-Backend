import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateCounterDto {

    @IsNotEmpty()
    @IsDateString() 
    startDate: Date;

    @IsNotEmpty()
    @IsDateString() 
    finishDate: Date;

    @IsNotEmpty()
    @IsNumber()
    enrollmentId: number;

}
