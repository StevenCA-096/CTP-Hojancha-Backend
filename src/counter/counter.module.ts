import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './entities/counter.entity';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

@Module({
  imports:[TypeOrmModule.forFeature([Counter]), EnrollmentModule],
  controllers: [CounterController],
  providers: [CounterService],
  exports: [TypeOrmModule, CounterService]
})
export class CounterModule {}
