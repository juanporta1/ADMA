import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThanOrEqual, Not, Repository } from 'typeorm';
import { Appointment } from '../../pages/appointment/appointment.entity';
import { IncomeForm } from '../../pages/income-form/income-form.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(IncomeForm) 
    private readonly incomeFormRepository: Repository<IncomeForm>, // Agrega esta linea para poder usar el repositorio de IncomeForm
  ) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async updateStatus() {
    console.log('Actualizando status de citas...');
    const today = new Date();
    await this.appointmentRepository.update(
      {
        date: LessThanOrEqual(today),
        status: Not(
          In([
            'Ausentado',
            'Cancelado',
            'No Realizado',
            'Realizado',
            'En Proceso',
          ])
        ),
      },
      { status: 'Esperando Actualización' }
    );
    
  }
}
