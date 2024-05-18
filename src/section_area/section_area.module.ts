import { Module } from '@nestjs/common';
import { SectionAreaService } from './section_area.service';
import { SectionAreaController } from './section_area.controller';
import { SectionArea } from './entities/section_area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionModule } from 'src/section/section.module';
import { AreaModule } from 'src/area/area.module';

@Module({
  imports:[TypeOrmModule.forFeature([SectionArea] ), SectionModule, AreaModule],
  controllers: [SectionAreaController],
  providers: [SectionAreaService],
  exports: [TypeOrmModule, SectionAreaService]
})
export class SectionAreaModule {}
