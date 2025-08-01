import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Castration } from '../castration.entity';
import { Repository } from 'typeorm';
import { CreateCastrationDTO } from '../DTOs/create-castration.DTO';
import { Appointment } from '../../appointment/appointment.entity';
import { IncomeForm } from '../../income-form/income-form.entity';
import { Veterinarian } from '../../../data-entities/entities/veterinarian.entity';
import PDFDocumentWithTables from 'pdfkit-table';
import { FilterAppointmentDto } from '../../appointment/DTOs/filter-appointment.dto';
import { AppointmentService } from '../../appointment/service/appointment.service';
import { PdfServiceCastration } from './pdf-service/pdf-service.service';

@Injectable()
export class CastrationService {
  constructor(
    @InjectRepository(Castration)
    private castrationRepository: Repository<Castration>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(IncomeForm)
    private incomeFormRepository: Repository<IncomeForm>,
    @InjectRepository(Veterinarian)
    private veterinarianRepository: Repository<Veterinarian>,
    private readonly appointementService: AppointmentService,
    private readonly pdfService: PdfServiceCastration
  ) {}

  async createCastration(body: CreateCastrationDTO) {
    console.log('Desde CastrationService: ', body);
    if (!body.ID_veterinarian) return new Error('Veterinarian ID is required');
    const appointment = await this.appointmentRepository.findOne({
      where: { ID_appointment: body.ID_appointment },
      relations: ['incomeForm'],
    });
    const veterinarian = await this.veterinarianRepository.findOne({
      where: { ID_veterinarian: body.ID_veterinarian },
    });

    if (!veterinarian) throw new Error('Veterinarian  not found');
    if (!appointment) throw new Error('Appointment not found');
    if (!appointment.incomeForm) throw new Error('IncomeFrom does not exist');

    const newCastration = this.castrationRepository.create({
      age: body.age,
      weight: Number(body.weight),
      animalName: body.animalName,
      features: body.features,
      veterinarian: veterinarian,
      observations: body.observations,
    });
    await this.castrationRepository.save(newCastration);

    await this.appointmentRepository.update(appointment.ID_appointment, {
      incomeForm: null,
      castration: newCastration,
    });

    await this.incomeFormRepository.delete(appointment.incomeForm.ID_income);
    return newCastration;
  }
  async generatePDF(doc: PDFDocumentWithTables, filters: FilterAppointmentDto) {
    const registers = await this.appointementService.getAll({
      ...filters,
      status: 'Realizado',
    });
    // console.log(filters.values);
    doc.on('pageAdded', () => {
      this.pdfService.generateHeader(doc, filters, true);
    });
    await this.pdfService.generateHeader(doc, filters);
    if (filters.values)
      this.pdfService.newTable(doc, registers[0], filters.values);
  }
}
