import { Module } from '@nestjs/common';
import { IncomeFormService } from './service/income-form.service';
import { IncomeFormController } from './controller/income-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeForm } from './income-form.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Veterinarian } from '../../data-entities/entities/veterinarian.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeForm, Appointment, Veterinarian])],
  providers: [IncomeFormService],
  controllers: [IncomeFormController],
  exports: [TypeOrmModule],
})
export class IncomeFormModule {}
