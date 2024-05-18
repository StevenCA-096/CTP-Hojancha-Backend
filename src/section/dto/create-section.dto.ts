import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateSectionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    quota: number;

    @IsNotEmpty()
    @IsBoolean()
    isAided: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isNocturnal: boolean;

    @IsNotEmpty()
    @IsNumber()
    enrollmentId: number;

}
