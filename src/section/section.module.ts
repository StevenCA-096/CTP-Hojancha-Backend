import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { Section } from './entities/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

@Module({
  imports:[TypeOrmModule.forFeature([Section]), EnrollmentModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [TypeOrmModule, SectionService]
})
export class SectionModule {}
