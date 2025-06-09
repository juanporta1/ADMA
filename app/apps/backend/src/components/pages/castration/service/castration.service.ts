import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Castration } from '../castration.entity';
import { Repository } from 'typeorm';
import { CreateCastrationDTO } from '../DTOs/create-castration.DTO';
import { Appointment } from '../../appointment/appointment.entity';
import { IncomeForm } from '../../income-form/income-form.entity';

@Injectable()
export class CastrationService {
  constructor(
    @InjectRepository(Castration)
    private castrationRepository: Repository<Castration>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(IncomeForm)
    private incomeFormRepository: Repository<IncomeForm>
  ) {}

  async createCastration(body: CreateCastrationDTO) {
    console.log('Desde CastrationService: ', body);
    const appointment = await this.appointmentRepository.findOne({
      where: { ID_appointment: body.ID_appointment },
      relations: ['incomeForm'],
    });
    if (!appointment) throw new Error('Appointment not found');
    if (!appointment.incomeForm) throw new Error('IncomeFrom does not exist');

    const newCastration = this.castrationRepository.create({
      age: body.age,
      weight: Number(body.weight),
      animalName: body.animalName,
      features: body.features,
    });
    await this.castrationRepository.save(newCastration);

    await this.appointmentRepository.update(appointment.ID_appointment, {
      incomeForm: null,
      castration: newCastration,
    });

    await this.incomeFormRepository.delete(appointment.incomeForm.ID_income);
    return newCastration;
  }
}
