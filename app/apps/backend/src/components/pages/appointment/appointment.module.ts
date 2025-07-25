import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './service/appointment.service';
import { AppointmentController } from './controller/appointment.controller';
import { PdfServiceAppointment } from './service/pdf-service/pdf-service.service';
import { DataEntitiesModule } from '../../data-entities/data-entities.module';
import { DataEntitiesService } from '../../data-entities/services/data-entities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), DataEntitiesModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, PdfServiceAppointment, DataEntitiesService],
  exports: [TypeOrmModule],
})
export class AppoimentModule {}
