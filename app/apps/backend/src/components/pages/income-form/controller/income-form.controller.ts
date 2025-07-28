import { Body, Controller, Get, Post, Query, Put, Res } from '@nestjs/common';
import { IncomeFormService } from '../service/income-form.service';
import type { FilterIncomeDTO } from '../DTOs/filter-income.DTO';
import type { CreateIncomeDTO } from '../DTOs/create-income.DTO';
import type { DoneIncomeDTO } from '../DTOs/done-income.DTO';
import { FilterAppointmentDto } from '../../appointment/DTOs/filter-appointment.dto';
import { type Response } from 'express';
import PDFDocumentWithTables from 'pdfkit-table';
@Controller('income-form')
export class IncomeFormController {
  constructor(private readonly incomeFormService: IncomeFormService) {}

  @Get('')
  async getIncomeForm(@Query() query: FilterIncomeDTO) {
    return await this.incomeFormService.getIncomeForm(query);
  }

  @Post('')
  async createIncome(@Body() body: CreateIncomeDTO) {
    console.log(body);
    return await this.incomeFormService.createIncome(body);
  }

  @Put(':id')
  async editIncome(@Body() body: DoneIncomeDTO, @Query('id') id: number) {
    return await this.incomeFormService.editIncome(body, id);
  }
  @Get('pdf')
  async generatePDF(
    @Res() res: Response,
    @Query() querys: FilterAppointmentDto
  ): Promise<void> {
    const doc = new PDFDocumentWithTables({
      info: {
        Title: 'ADMA',
      },
      layout: 'landscape',
      size: 'A4',
      margins: {
        top: 65,
        bottom: 10,
        left: 15,
        right: 15,
      },
    });

    doc.moveDown(2);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ADMA.pdf');
    doc.pipe(res);

    await this.incomeFormService.generatePDF(doc, querys);

    doc.end();
  }
}
