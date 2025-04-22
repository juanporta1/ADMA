import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CreateAppointmentDTO } from '../appointment-DTOs/create-appointment.dto';
import { AppointmentService } from '../appoinment-service/appointment.service';
import { UpdateAppointmentDto } from '../appointment-DTOs/update-appointment.dto';
import { FilterAppointmentDto } from '../appointment-DTOs/filter-appointment.dto';
import { QueryBuilder, ReturnDocument } from 'typeorm';
import PDFDocumentWithTables from 'pdfkit-table';
import type { Response } from 'express';
@Controller('appointment')
export class AppointmentController {

    constructor(private appointmentService: AppointmentService) { }

    @Get("")
    async getAppointments(@Query() querys: FilterAppointmentDto) {
        console.log("Query Params:", querys);
        return await this.appointmentService.getAll(querys);
    }

    @Post("bulk")
    async createAppointments(@Body() body: CreateAppointmentDTO[]) {
        return await this.appointmentService.createAppointmentsBulk(body);
    }

    @Post("")
    async createAnAppointment(@Body() body: CreateAppointmentDTO) {
        return await this.appointmentService.createOneAppointment(body);
    }

    @Delete(":id")
    async deleteAnAppointment(@Param("id") id: string) {
        return await this.appointmentService.deleteAppointment(Number(id))
    }

    @Put(":id")
    async updateAnAppoiment(@Param("id") id: number, @Body() body: UpdateAppointmentDto) {
        return await this.appointmentService.updateAppointment(Number(id), body);
    }

    @Get("pdf")
    async generatePDF(@Res() res: Response, @Body() body: FilterAppointmentDto): Promise<void> {

        const doc = new PDFDocumentWithTables({
            info: {
                Title: "ADMA",
            },
            layout: 'landscape',

            size: 'A4',
            margins: {
                top: 25,
                bottom: 10,
                left: 15,
                right: 20
            }
        })
        doc.moveDown(2);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ADMA.pdf');
        doc.pipe(res);
        console.log("haciendo")
        await this.appointmentService.generatePDF(doc, body);
        console.log("hecho")
        doc.end();
    }
}
