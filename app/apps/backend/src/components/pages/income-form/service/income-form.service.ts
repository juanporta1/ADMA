import { Injectable } from '@nestjs/common';
import type { FilterIncomeDTO } from '../DTOs/filter-income.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeForm } from '../income-form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncomeFormService {
    constructor(@InjectRepository(IncomeForm) private incomeFormRepository: Repository<IncomeForm>) { }
    async getIncomeForm(querys: FilterIncomeDTO) {
        const filterQuery = this.incomeFormRepository.createQueryBuilder("i")
        if (querys.ID_income) {
            filterQuery.andWhere("i.ID_income = :ID_income", { ID_income: querys.ID_income })
        }

        return await filterQuery.getMany();
    }
}
