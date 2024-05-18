import { IsInt, IsString, IsBoolean, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';

export class CreateStudentDto {

    @IsNotEmpty()
    @IsInt()
    cedula: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName1: string;

    @IsNotEmpty()
    @IsString()
    lastName2: string;

    @IsNotEmpty()
    @IsString()
    sex: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    birthplace: string;

    @IsNotEmpty()
    @IsDateString()
    birthday: Date;

    @IsNotEmpty()
    @IsString()
    lastInstitution: string;

    @IsNotEmpty()
    @IsString()
    adequacy: string;

    @IsNotEmpty()
    @IsString()
    canton: string;

    @IsNotEmpty()
    @IsString()
    district: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsBoolean()
    requireTransport: boolean;

    @IsString()
    transportRoute: string;

    @IsNotEmpty()
    @IsEmail()
    personalEmail: string;

    @IsEmail()
    mepEmail: string;

}
