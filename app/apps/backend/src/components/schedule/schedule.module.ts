import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppointmentService } from './appointment/appointment.service';
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AppointmentService],
})
export class SchedulesModule {}
