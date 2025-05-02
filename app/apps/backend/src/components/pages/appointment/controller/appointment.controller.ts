import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateAppointmentDTO } from '../DTOs/create-appointment.dto';
import { AppointmentService } from '../service/appointment.service';
import { UpdateAppointmentDto } from '../DTOs/update-appointment.dto';
import { FilterAppointmentDto } from '../DTOs/filter-appointment.dto';
import PDFDocumentWithTables from 'pdfkit-table';
import type {  Response } from 'express';
@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('')
  async getAppointments(@Query() querys: FilterAppointmentDto) {
    // console.log('Query Params:', querys);
    return await this.appointmentService.getAll(querys);
  }

  @Post('bulk')
  async createAppointments(@Body() body: CreateAppointmentDTO[]) {
    return await this.appointmentService.createAppointmentsBulk(body);
  }

  @Post('')
  async createAnAppointment(@Body() body: CreateAppointmentDTO) {
    return await this.appointmentService.createOneAppointment(body);
  }

  @Delete(':id')
  async deleteAnAppointment(@Param('id') id: string) {
    return await this.appointmentService.deleteAppointment(Number(id));
  }

  @Put(':id')
  async updateAnAppoiment(
    @Param('id') id: number,
    @Body() body: UpdateAppointmentDto
  ) {
    return await this.appointmentService.updateAppointment(Number(id), body);
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
        top: 25,
        bottom: 25,
        left: 15,
        right: 15,
      },
    });
    doc.moveDown(2);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ADMA.pdf');
    doc.pipe(res);

    await this.appointmentService.generatePDF(doc, querys);

    doc.end();
  }
}
