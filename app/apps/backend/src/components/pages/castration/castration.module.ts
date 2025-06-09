import { Module } from '@nestjs/common';
import { CastrationService } from './service/castration.service';
import { CastrationController } from './controller/castration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Castration } from './castration.entity';
import { Appointment } from '../appointment/appointment.entity';
import { IncomeForm } from '../income-form/income-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Castration, Appointment, IncomeForm])],
  providers: [CastrationService],
  controllers: [CastrationController],
  exports: [TypeOrmModule],
})
export class CastrationModule {}
