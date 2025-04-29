import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppointmentService } from './appointment/appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../pages/appointment/appointment.entity';
import { IncomeForm } from '../pages/income-form/income-form.entity';
@Module({
  imports: [ScheduleModule.forRoot(),TypeOrmModule.forFeature([Appointment,IncomeForm])],
  providers: [AppointmentService],
})
export class SchedulesModule {}
