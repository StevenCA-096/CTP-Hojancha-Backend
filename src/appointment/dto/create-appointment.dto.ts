import { IsInt, IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {

    @IsNotEmpty()
    @IsDateString()
    date: Date;
    
    @IsNotEmpty()
    @IsBoolean()
    taken: boolean;

    @IsNotEmpty()
    @IsInt()
    counterId: number;

}
