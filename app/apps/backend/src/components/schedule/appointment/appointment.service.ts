import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThanOrEqual, Not, Repository } from 'typeorm';
import { Appointment } from '../../pages/appointment/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
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
