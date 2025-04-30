import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IncomeFormService } from '../service/income-form.service';
import type { FilterIncomeDTO } from '../DTOs/filter-income.DTO';
import type { CreateIncomeDTO } from '../DTOs/create-income.DTO';

@Controller('income-form')
export class IncomeFormController {

    constructor(private readonly incomeFormService: IncomeFormService){}

    @Get("")
    async getIncomeForm(@Query() query: FilterIncomeDTO){
       return await this.incomeFormService.getIncomeForm(query)
    }

    @Post("")
    async createIncome(@Body() body: CreateIncomeDTO){
        console.log(body)
        return await this.incomeFormService.createIncome(body)
    }
}
