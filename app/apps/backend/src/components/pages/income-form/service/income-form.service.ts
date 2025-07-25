import { Injectable } from '@nestjs/common';
import type { FilterIncomeDTO } from '../DTOs/filter-income.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeForm } from '../income-form.entity';
import { Repository } from 'typeorm';
import { CreateIncomeDTO } from '../DTOs/create-income.DTO';
import { Appointment } from '../../appointment/appointment.entity';
import { DoneIncomeDTO } from '../DTOs/done-income.DTO';
import { Veterinarian } from '../../../data-entities/entities/veterinarian.entity';
import PDFDocumentWithTables from 'pdfkit-table';
import { FilterAppointmentDto } from '../../appointment/DTOs/filter-appointment.dto';
import { PdfServiceIncome } from './pdf-service/pdf-service.service';
import { AppointmentService } from '../../appointment/service/appointment.service';

@Injectable()
export class IncomeFormService {
  constructor(
    @InjectRepository(IncomeForm)
    private incomeFormRepository: Repository<IncomeForm>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Veterinarian)
    private veterinarianRepository: Repository<Veterinarian>,
    private readonly pdfService: PdfServiceIncome,
    private readonly appointmentService: AppointmentService
  ) {}
  async getIncomeForm(querys: FilterIncomeDTO) {
    const filterQuery = this.incomeFormRepository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.veterinarian', 'veterinarian');
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
    let veterinarian = null;
    if (body.ID_veterinarian) {
      veterinarian = await this.veterinarianRepository.findOne({
        where: { ID_veterinarian: body.ID_veterinarian },
      });
    }
    if (!appointment) return;

    const incomeObject = {
      age: body?.age || null,
      weight: Number(body?.weight) || null,
      animalName: body?.animalName || null,
      features: body?.features || null,
      veterinarian: veterinarian,
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

  async generatePDF(doc: PDFDocumentWithTables, filters: FilterAppointmentDto) {
    const registers = await this.appointmentService.getAll(filters);
    console.log(filters, 'Filters');
    console.log(registers, 'Registers');

    this.addFooter(doc);
    doc.on('pageAdded', () => {
      this.addFooter(doc);
    });
    await this.pdfService.generateHeader(doc);
    this.pdfService.newTable(doc, registers[0], this.addFooter);
  }
  addFooter(doc: PDFDocumentWithTables) {
    const footerText = 'Documento confidencial - ADMA';
    const y = doc.page.height + 30;

    doc.fontSize(9).fillColor('black').text(footerText, 0, y, {
      align: 'center',
      width: doc.page.width,
    });
  }
}
