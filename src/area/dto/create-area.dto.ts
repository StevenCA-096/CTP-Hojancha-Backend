import {IsString, IsNotEmpty} from 'class-validator';

export class CreateAreaDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    category: string;
}
