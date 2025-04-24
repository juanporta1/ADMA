import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './service/appointment.service';
import { AppointmentController } from './controller/appointment.controller';
import { PdfService } from './service/pdf-service/pdf-service.service';
import { DataEntitiesModule } from '../../data-entities/data-entities.module';
import { DataEntitiesService } from '../../data-entities/services/data-entities.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), DataEntitiesModule, ScheduleModule.forRoot()],
  controllers: [AppointmentController],
  providers: [AppointmentService, PdfService, DataEntitiesService],
  exports: [TypeOrmModule]
})
export class AppoimentModule {}
