import { Module } from '@nestjs/common';
import { CastrationService } from './service/castration.service';
import { CastrationController } from './controller/castration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Castration } from './castration.entity';
import { Appointment } from '../appointment/appointment.entity';
import { IncomeForm } from '../income-form/income-form.entity';
import { Veterinarian } from '../../data-entities/entities/veterinarian.entity';
import { PdfServiceService } from './service/pdf-service.service';
import { PdfServiceService } from './service/pdf-service/pdf-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Castration,
      Appointment,
      IncomeForm,
      Veterinarian,
    ]),
  ],
  providers: [CastrationService, PdfServiceService],
  controllers: [CastrationController],
  exports: [TypeOrmModule],
})
export class CastrationModule {}
