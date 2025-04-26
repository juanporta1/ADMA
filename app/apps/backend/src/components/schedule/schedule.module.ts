import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppointmentService } from './appointment/appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../pages/appointment/appointment.entity';
@Module({
  imports: [ScheduleModule.forRoot(),TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentService],
})
export class SchedulesModule {}
