import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appoinment-service/appointment.service';
import { AppointmentController } from './appointment-controller/appointment.controller';
import { PdfService } from './appoinment-service/pdf-service/pdf-service.service';
import { Neighborhood } from '../../data-entities/entities/neighborhood.entity';
import { DataEntitiesModule } from '../../data-entities/data-entities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), DataEntitiesModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, PdfService],
  exports: [TypeOrmModule]
})
export class AppoimentModule {}
