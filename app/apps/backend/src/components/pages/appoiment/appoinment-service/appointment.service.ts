import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, Filter, Repository } from 'typeorm';
import { CreateAppointmentDTO } from '../appointment-DTOs/create-appointment.dto';
import { Appointment } from '../appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAppointmentDto } from '../appointment-DTOs/update-appointment.dto';
import { FilterAppointmentDto } from '../appointment-DTOs/filter-appointment.dto';
import fs from 'fs';
import PDFDocumentWithTables from 'pdfkit-table';
import { PdfService } from './pdf-service/pdf-service.service';
@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private pdfService: PdfService
  ) { }

  async getAll(querys: FilterAppointmentDto) {
    if (Object.keys(querys).length != 0) {
      const filterQueryBuilder =
        this.appointmentRepository.createQueryBuilder('a');

      if (querys.id)
        filterQueryBuilder.andWhere('a.ID_appointment = :id', {
          id: querys.id,
        });
      if (querys.lastName)
        filterQueryBuilder.andWhere('a.owner ILIKE :lastName', {
          lastName: `%${querys.lastName}%`,
        });
      if (querys.name)
        filterQueryBuilder.andWhere('a.owner ILIKE :name', {
          name: `%${querys.name}%`,
        });
      if (querys.neighborhood)
        filterQueryBuilder.andWhere('a.neighborhood = :neighborhood', {
          neighborhood: querys.neighborhood,
        });
      if (querys.size)
        filterQueryBuilder.andWhere('a.size = :size', { size: querys.size });
      if (querys.sex)
        filterQueryBuilder.andWhere('a.sex = :sex', { sex: querys.sex });
      if (querys.specie)
        filterQueryBuilder.andWhere('a.specie = :specie', {
          specie: querys.specie,
        });
      if (querys.date)
        filterQueryBuilder.andWhere('a.date = :date', { date: querys.date });
      if (querys.startDate)
        filterQueryBuilder.andWhere('a.date >= :startDate', {
          startDate: new Date(querys.startDate),
        });
      if (querys.endDate)
        filterQueryBuilder.andWhere('a.date <= :endDate', {
          endDate: new Date(querys.endDate),
        });
      if (querys.dni)
        filterQueryBuilder.andWhere('a.dni ILIKE :dni', {
          dni: `${querys.dni}%`,
        });

      if (querys.orderBy) {
        if (querys.orderBy === 'owner-asc')
          filterQueryBuilder.orderBy('a.lastName', 'ASC');
        else if (querys.orderBy === 'owner-desc')
          filterQueryBuilder.orderBy('a.lastName', 'DESC');
        else if (querys.orderBy === 'date-asc')
          filterQueryBuilder.orderBy('a.date', 'ASC');
        else if (querys.orderBy === 'date-desc')
          filterQueryBuilder.orderBy('a.date', 'DESC');
        else if (querys.orderBy === 'id-asc')
          filterQueryBuilder.orderBy('a.ID_appointment', 'ASC');
        else if (querys.orderBy === 'id-desc')
          filterQueryBuilder.orderBy('a.ID_appointment', 'DESC');
      }

      if (querys.status)
        filterQueryBuilder.andWhere('a.status = :status', {
          status: querys.status,
        });
      if (querys.byDate)
        filterQueryBuilder.andWhere('a.date = :byHour', {
          byHour: querys.byDate,
        });
      if (querys.byHour)
        filterQueryBuilder.andWhere(`a.hour = :hour`, { hour: querys.byHour });
      filterQueryBuilder.leftJoinAndSelect("a.neighborhood", "neighborhood")
      filterQueryBuilder.leftJoinAndSelect("a.specie", "specie")
      filterQueryBuilder.leftJoinAndSelect("a.reason", "reason")

      return await filterQueryBuilder.getMany();
    } else {
      return await this.appointmentRepository.find();
    }
  }
  async createAppointmentsBulk(
    appointments: CreateAppointmentDTO[]
  ): Promise<Appointment[]> {
    const allAppointments: Appointment[] = [];
    appointments.forEach(async (appointment) => {
      try {
        const newAppointment = this.appointmentRepository.create(appointment);
        await this.appointmentRepository.save(newAppointment);
        allAppointments.push(newAppointment);
      } catch (error) {
        throw error;
      }
    });
    return allAppointments;
  }

  async createOneAppointment(
    appointment: CreateAppointmentDTO
  ): Promise<Appointment> {
    try {
      const newAppointment = await this.appointmentRepository.create(
        appointment
      );
      return await this.appointmentRepository.save(newAppointment);
    } catch (error) {
      throw error;
    }
  }

  async deleteAppointment(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { ID_appointment: id },
    });
    if (!appointment)
      return new HttpException('No se encontro el recurso solicitado.', 404);

    if (appointment.date <= new Date())
      return new HttpException('No se puede borrar este recurso', 403);

    try {
      return await this.appointmentRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateAppointment(
    id: number,
    updatedAppointment: UpdateAppointmentDto
  ) {
    try {
      return await this.appointmentRepository.update(id, updatedAppointment);
    } catch (error) {
      throw error;
    }
  }

  async generatePDF(doc: PDFDocumentWithTables, filters: FilterAppointmentDto) {
    const registers = await this.getAll(filters);
    this.pdfService.generateHeader(doc)
    this.pdfService.newTable(doc)
    registers.forEach((a, id) => {
      id++;
      this.pdfService.generateRow(doc, a, id)
      if (id % 10 === 0) {
        doc.addPage()
      }
    })

    
  }
}
