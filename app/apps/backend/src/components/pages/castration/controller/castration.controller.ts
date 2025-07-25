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
}
