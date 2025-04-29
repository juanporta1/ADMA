import { Controller, Get, Query } from '@nestjs/common';
import { IncomeFormService } from '../service/income-form.service';
import type { FilterIncomeDTO } from '../DTOs/filter-income.DTO';

@Controller('income-form')
export class IncomeFormController {

    constructor(private readonly incomeFormService: IncomeFormService){}

    @Get("")
    async getIncomeForm(@Query() query: FilterIncomeDTO){
       return await this.incomeFormService.getIncomeForm(query)
    }

}
