import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionAreaService } from './section_area.service';
import { CreateSectionAreaDto } from './dto/create-section_area.dto';
import { UpdateSectionAreaDto } from './dto/update-section_area.dto';

@Controller('section-area')
export class SectionAreaController {
  constructor(private readonly sectionAreaService: SectionAreaService) {}

  @Post()
  create(@Body() createSectionAreaDto: CreateSectionAreaDto) {
    return this.sectionAreaService.create(createSectionAreaDto);
  }

  @Get()
  findAll() {
    return this.sectionAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionAreaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionAreaService.remove(+id);
  }
}
