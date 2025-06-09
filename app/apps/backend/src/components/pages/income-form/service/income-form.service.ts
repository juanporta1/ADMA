import { Injectable } from '@nestjs/common';
import type { FilterIncomeDTO } from '../DTOs/filter-income.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeForm } from '../income-form.entity';
import { Repository } from 'typeorm';
import { CreateIncomeDTO } from '../DTOs/create-income.DTO';
import { Appointment } from '../../appointment/appointment.entity';
import { DoneIncomeDTO } from '../DTOs/done-income.DTO';

@Injectable()
export class IncomeFormService {
  constructor(
    @InjectRepository(IncomeForm)
    private incomeFormRepository: Repository<IncomeForm>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}
  async getIncomeForm(querys: FilterIncomeDTO) {
    const filterQuery = this.incomeFormRepository.createQueryBuilder('i');
    if (querys.ID_income) {
      filterQuery.andWhere('i.ID_income = :ID_income', {
        ID_income: querys.ID_income,
      });
    }

    return await filterQuery.getMany();
  }

  async createIncome(body: CreateIncomeDTO) {
    const appointment = await this.appointmentRepository.findOne({
      where: { ID_appointment: body.ID_appointment },
    });
    if (!appointment) return;
    const incomeObject = {
      age: body?.age || null,
      weight: Number(body?.weight) || null,
      animalName: body?.animalName || null,
      features: body?.features || null,
    };

    const newIncome = await this.incomeFormRepository.create(incomeObject);
    await this.incomeFormRepository.save(newIncome);
    return this.appointmentRepository.update(appointment.ID_appointment, {
      incomeForm: newIncome,
    });
  }
  async editIncome(body: DoneIncomeDTO, ID_income: number) {
    const updatedIncome = await this.incomeFormRepository.update(
      { ID_income },
      {
        age: body.age,
        weight: Number(body.weight),
        animalName: body.animalName,
        features: body.features,
      }
    );
    return updatedIncome;

  }
}
