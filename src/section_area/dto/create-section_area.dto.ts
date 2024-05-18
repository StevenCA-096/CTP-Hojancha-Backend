import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSectionAreaDto {

    @IsNotEmpty()
    @IsInt()
    sectionId: number;

    @IsNotEmpty()
    @IsInt()
    areaId: number;

}
