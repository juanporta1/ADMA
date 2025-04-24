import { HttpException, Injectable } from '@nestjs/common';
import { In, LessThanOrEqual, Not, Repository, UpdateResult } from 'typeorm';
import { CreateAppointmentDTO } from '../DTOs/create-appointment.dto';
import { Appointment } from '../appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAppointmentDto } from '../DTOs/update-appointment.dto';
import { FilterAppointmentDto } from '../DTOs/filter-appointment.dto';
import PDFDocumentWithTables from 'pdfkit-table';
import { PdfService } from './pdf-service/pdf-service.service';
import { ResidualNumber } from '../../../data-entities/entities/residual-number.entity';
import { DataEntitiesService } from '../../../data-entities/services/data-entities.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private pdfService: PdfService,
    @InjectRepository(ResidualNumber)
    private readonly dataEntitiesService: DataEntitiesService
  ) {}

  async getAll(querys: FilterAppointmentDto) {
    if (Object.keys(querys).length != 0) {
      const filterQueryBuilder =
        this.appointmentRepository.createQueryBuilder('a');

      if (querys.id)
        filterQueryBuilder.andWhere('a.ID_appointment = :id', {
          id: querys.id,
        });
      if (querys.owner)
        filterQueryBuilder.andWhere(
          '(a.lastName || " " || a.name) ILIKE :owner',
          {
            owner: `%${querys.owner}%`,
          }
        );

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
      if (querys.dateFilterWay) {
        if (querys.dateFilterWay === 'interval') {
          if (querys.startDate) {
            const date = new Date(querys.startDate);
            const findDate = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`;
            filterQueryBuilder.andWhere('a.date >= :startDate', {
              startDate: findDate,
            });
          }
          if (querys.endDate) {
            const date = new Date(querys.endDate);
            const findDate = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`;
            filterQueryBuilder.andWhere('a.date <= :endDate', {
              endDate: findDate,
            });
          }
        } else if (querys.dateFilterWay === 'onlyOne') {
          if (querys.date) {
            const date = new Date(querys.date);
            const findDate = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`;
            filterQueryBuilder.andWhere('a.date = :date', {
              date: findDate,
            });
          }
        }
      }

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

      if (querys.byHour)
        filterQueryBuilder.andWhere(`a.hour = :hour`, { hour: querys.byHour });
      filterQueryBuilder.leftJoinAndSelect('a.neighborhood', 'neighborhood');
      filterQueryBuilder.leftJoinAndSelect('a.specie', 'specie');
      filterQueryBuilder.leftJoinAndSelect('a.reason', 'reason');

      return await filterQueryBuilder.getMany();
    } else {
      return await this.appointmentRepository.find({
        relations: ['neighborhood', 'specie', 'reason'],
      });
    }
  }
  async createAppointmentsBulk(
    appointments: CreateAppointmentDTO[]
  ): Promise<Appointment[]> {
    const allAppointments: Appointment[] = [];
    let surgeryNumber: number;
    const residualNumbersRegisters =
      await this.dataEntitiesService.getResidualNumbers();
    if (residualNumbersRegisters.length === 0) {
      const max = await this.appointmentRepository
        .createQueryBuilder('a')
        .select('MAX(a.surgeryNumber)', 'max')
        .getRawOne();
      surgeryNumber = (max?.max || 0) + 1;
    } else {
      surgeryNumber = residualNumbersRegisters[0].number;
    }
    appointments.forEach(async (appointment) => {
      try {
        const newAppointment = await this.createOneAppointment(
          appointment,
          surgeryNumber
        );
        await this.appointmentRepository.save(newAppointment);
        allAppointments.push(newAppointment);
        surgeryNumber++;
      } catch (error) {
        throw error;
      }
    });
    return allAppointments;
  }

  async createOneAppointment(
    appointment: CreateAppointmentDTO,
    number: number | null = null
  ): Promise<Appointment> {
    try {
      let surgeryNumber;
      const residualNumbersRegisters =
        await this.dataEntitiesService.getResidualNumbers();
      if (number !== null) surgeryNumber = number;
      else if (residualNumbersRegisters.length === 0) {
        const max = await this.appointmentRepository
          .createQueryBuilder('a')
          .select('MAX(a.surgeryNumber)', 'max')
          .getRawOne();
        surgeryNumber = (max?.max || 0) + 1;
      } else {
        surgeryNumber = residualNumbersRegisters[0].number;
      }

      const newAppointment = await this.appointmentRepository.create({
        surgeryNumber: surgeryNumber,
        ...appointment,
      });
      const createdAppointment = await this.appointmentRepository.save(
        newAppointment
      );

      if (residualNumbersRegisters.length !== 0)
        this.dataEntitiesService.deleteResidualNumber(
          residualNumbersRegisters[0].ID_residualNumber
        );

      return createdAppointment;
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
      const deletedAppointment = await this.getAll({ id });
      const deleteResult = await this.appointmentRepository.delete(id);
      if (
        deleteResult.affected &&
        deleteResult.affected > 0 &&
        deletedAppointment[0]?.surgeryNumber !== undefined
      ) {
        if (deletedAppointment[0].surgeryNumber) {
          this.dataEntitiesService.createResidualNumber(
            deletedAppointment[0].surgeryNumber
          );
        }
      }
      return deleteResult;
    } catch (error) {
      throw error;
    }
  }

  async updateAppointment(
    id: number,
    updatedAppointment: UpdateAppointmentDto
  ) {
    try {
      let updateResult: UpdateResult;
      const appointment = await this.getAll({ id });
      console.log(updatedAppointment);
      if (
        ['Ausentado', 'Cancelado', 'No Realizado'].includes(
          updatedAppointment.status
        )
      ) {
        console.log('Entra en el if de updateAppointment');
        updateResult = await this.appointmentRepository.update(id, {
          ...updatedAppointment,
          surgeryNumber: null,
        });
        if (
          appointment[0].surgeryNumber &&
          updateResult.affected &&
          updateResult.affected > 0
        ) {
          this.dataEntitiesService.createResidualNumber(
            appointment[0].surgeryNumber
          );
        }
      } else {
        updateResult = await this.appointmentRepository.update(
          id,
          updatedAppointment
        );
      }
      return updateResult;
    } catch (error) {
      throw error;
    }
  }

  async generatePDF(doc: PDFDocumentWithTables, filters: FilterAppointmentDto) {
    const registers = await this.getAll(filters);
    console.log(filters.values);

    await this.pdfService.generateHeader(doc, filters);
    if (filters.values)
      this.pdfService.newTable(doc, registers, filters.values);
    this.pdfService.generateFooter(doc);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateStatus() {
    console.log('Actualizando status de citas...');
    const today = new Date();
    await this.appointmentRepository.update(
      { date: LessThanOrEqual(today),
        status: Not(In(['Ausentado', 'Cancelado', 'No Realizado', "Realizado", "En Proceso"]))
      },
      { status: "Esperando Actualización" }
    );
  }
}
