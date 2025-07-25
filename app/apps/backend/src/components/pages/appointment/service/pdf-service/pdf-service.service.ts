import { Injectable } from '@nestjs/common';
import PDFDocumnetWithTables from 'pdfkit-table';
import { FilterAppointmentDto } from '../../DTOs/filter-appointment.dto';
import { Appointment } from '../../appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Neighborhood } from '../../../../data-entities/entities/neighborhood.entity';
import { Specie } from '../../../../data-entities/entities/specie.entity';

interface TextElement {
  title: string;
  value: string;
}
@Injectable()
export class PdfServiceAppointment {
  constructor(
    @InjectRepository(Neighborhood)
    private readonly nRepo: Repository<Neighborhood>,
    @InjectRepository(Specie) private readonly sRepo: Repository<Specie>
  ) {}
  async createFilterText(filters: FilterAppointmentDto) {
    const textsList: TextElement[] = [];
    if (filters.neighborhood) {
      const neighborhood = await this.nRepo.find({
        where: { ID_neighborhood: filters.neighborhood },
      });
      textsList.push({ title: 'Barrio', value: neighborhood[0].neighborhood });
    }
    if (filters.sex) {
      textsList.push({ title: 'Sexo', value: filters.sex });
    }
    if (filters.size) {
      textsList.push({ title: 'Tamaño', value: filters.size });
    }
    if (filters.specie) {
      const specie = await this.sRepo.find({
        where: { ID_specie: filters.specie },
      });
      textsList.push({ title: 'Especie', value: specie[0].specie });
    }
    if (filters.startDate) {
      const date = new Date(filters.startDate);
      textsList.push({
        title: 'Son despues de',
        value: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      });
    }
    if (filters.endDate) {
      const date = new Date(filters.endDate);
      textsList.push({
        title: 'Son antes de',
        value: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      });
    }
    if (filters.date) {
      const date = new Date(filters.date);
      textsList.push({
        title: 'Son unicamente del día',
        value: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      });
    }
    if (filters.status) {
      textsList.push({ title: 'Estado', value: filters.status });
    }
    if (filters.byHour) {
      textsList.push({ title: 'Hora', value: filters.byHour });
    }
    return textsList;
  }

  async generateHeader(
    doc: PDFDocumnetWithTables,
    filters: FilterAppointmentDto
  ) {
    const listElements = await this.createFilterText(filters);
    doc.fontSize(11);
    doc.font('Helvetica');

    doc.image('./apps/backend/src/assets/logo.png', 690, 15, { width: 110 });
    doc.image('./apps/backend/src/assets/logo2.png', 30, 10, { width: 100 });
    doc.moveDown(2);

    doc.x = 15;
    if (listElements.length) {
      doc.text(
        'Todos los registros de esta planilla comparten las siguientes caracteristicas: '
      );
      doc.moveDown(1);
      doc.x = 25;
      listElements.map((e, i) => {
        doc.text(`${i + 1}-${e.title}: ${e.value}`);
        doc.moveDown(1);
      });
      doc.x = 15;
    }
  }

  async generateFooter(doc: PDFDocumnetWithTables) {
    const date = new Date();
    doc.moveDown(1);
    doc.text(
      `Este registro fue generado el dia ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
      {
        align: 'center',
      }
    );
  }

  generateRow(appointment: Appointment, id: number, values: string[]) {
    const columns: string[] = [
      (id + 1).toString(),
      appointment.lastName,
      appointment.name,
    ];

    if (values.includes('Fecha')) columns.push(appointment.date.toString());
    if (values.includes('Hora')) columns.push(appointment.hour);
    if (values.includes('DNI')) columns.push(appointment.dni);
    if (values.includes('Teléfono')) columns.push(appointment?.phone || '-');
    if (values.includes('Barrio'))
      columns.push(appointment.neighborhood.neighborhood);
    if (values.includes('Domicilio')) columns.push(appointment.home);
    if (values.includes('Sexo')) columns.push(appointment.sex);
    if (values.includes('Tamaño')) columns.push(appointment.size);
    if (values.includes('Especie')) columns.push(appointment.specie.specie);
    if (values.includes('Estado')) columns.push(appointment.status);
    if (values.includes('Razón'))
      columns.push(appointment.reason?.reason || '-');
    if (values.includes('Observaciones'))
      columns.push(appointment?.observations || '-');
    console.log(columns, 'Columnas');
    return columns;
  }

  async newTable(
    doc: PDFDocumnetWithTables,
    registers: Appointment[],
    values: string[]
  ) {
    const headers = [
      { label: 'N°' },
      { label: 'Apellido' },
      { label: 'Nombre' },
    ];
    values.map((c, i) => {
      if (c != 'Dueño') headers.push({ label: c });
    });
    doc.table(
      {
        headers: headers,
        rows: [
          ...registers.map((a, id) =>
            this.generateRow(a, id, values).map((item) => String(item))
          ),
        ],
      },
      {
        minRowHeight: 30,
        padding: [1, 1, 1, 1],
      }
    );
  }
}
