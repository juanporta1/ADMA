import { Module } from '@nestjs/common';
import { IncomeFormService } from './service/income-form.service';
import { IncomeFormController } from './controller/income-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeForm } from './income-form.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Veterinarian } from '../../data-entities/entities/veterinarian.entity';
import { PdfServiceIncome } from './service/pdf-service/pdf-service.service';
import { AppointmentService } from '../appointment/service/appointment.service';
import { DataEntitiesModule } from '../../data-entities/data-entities.module';
import { DataEntitiesService } from '../../data-entities/services/data-entities.service';
import { PdfServiceAppointment } from '../appointment/service/pdf-service/pdf-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IncomeForm, Appointment, Veterinarian]),
    DataEntitiesModule,
  ],
  providers: [
    IncomeFormService,
    PdfServiceIncome,
    AppointmentService,
    DataEntitiesService,
    PdfServiceAppointment,
  ],
  controllers: [IncomeFormController],
  exports: [TypeOrmModule],
})
export class IncomeFormModule {}
