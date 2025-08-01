import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { CastrationService } from '../service/castration.service';
import type { CreateCastrationDTO } from '../DTOs/create-castration.DTO';
import PDFDocumentWithTables from 'pdfkit-table';
import { FilterAppointmentDto } from '../../appointment/DTOs/filter-appointment.dto';
import { type Response } from 'express';

@Controller('castration')
export class CastrationController {
  constructor(private readonly castrationService: CastrationService) {}

  @Post('')
  async createCastration(@Body() body: CreateCastrationDTO) {
    return await this.castrationService.createCastration(body);
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
        top: 80,
        bottom: 25,
        left: 15,
        right: 15,
      },
    });
    doc.moveDown(2);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ADMA.pdf');
    doc.pipe(res);

    await this.castrationService.generatePDF(doc, querys);

    doc.end();
  }
}
