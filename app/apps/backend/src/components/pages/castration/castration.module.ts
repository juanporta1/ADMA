import { Module } from '@nestjs/common';
import { CastrationService } from './service/castration.service';
import { CastrationController } from './controller/castration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Castration } from './castration.entity';
import { Appointment } from '../appointment/appointment.entity';
import { IncomeForm } from '../income-form/income-form.entity';
import { Veterinarian } from '../../data-entities/entities/veterinarian.entity';
import { PdfServiceCastration } from './service/pdf-service/pdf-service.service';
import { Neighborhood } from '../../data-entities/entities/neighborhood.entity';
import { Specie } from '../../data-entities/entities/specie.entity';
import { AppointmentService } from '../appointment/service/appointment.service';
import { PdfServiceAppointment } from '../appointment/service/pdf-service/pdf-service.service';
import { DataEntitiesService } from '../../data-entities/services/data-entities.service';
import { Reason } from '../../data-entities/entities/reason.entity';
import { ResidualNumber } from '../../data-entities/entities/residual-number.entity';
import { User } from '../../data-entities/entities/user.entity';
import { Setting } from '../../data-entities/entities/setting.entity';
import { AppointmentSchedule } from '../../data-entities/entities/appointment-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Castration,
      Appointment,
      IncomeForm,
      Veterinarian,
      Neighborhood,
      Specie,
      Reason,
      ResidualNumber,
      User,
      Setting,
      AppointmentSchedule,
    ]),
  ],
  providers: [
    CastrationService,
    PdfServiceCastration,
    PdfServiceAppointment,
    AppointmentService,
    DataEntitiesService,
  ],
  controllers: [CastrationController],
  exports: [TypeOrmModule],
})
export class CastrationModule {}
