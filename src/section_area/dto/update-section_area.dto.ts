import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionAreaDto } from './create-section_area.dto';

export class UpdateSectionAreaDto extends PartialType(CreateSectionAreaDto) {}
