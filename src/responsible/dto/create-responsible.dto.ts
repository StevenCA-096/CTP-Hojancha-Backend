import { IsString, IsNumber, IsNotEmpty} from 'class-validator';

export class CreateResponsibleDto {

    @IsNotEmpty()
    @IsNumber()
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

    @IsNumber()
    homePhone: number;

    @IsNumber()
    mobilePhone: number;

    @IsNotEmpty()
    @IsString()
    occupation: string;

    @IsNotEmpty()
    @IsString()
    country: string;
    
    @IsNotEmpty()
    @IsNumber()
    studentId: number;

}
