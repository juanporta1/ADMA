import { Injectable } from '@nestjs/common';
import PDFDocumnetWithTables from 'pdfkit-table';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Neighborhood } from '../../../../data-entities/entities/neighborhood.entity';
import { Specie } from '../../../../data-entities/entities/specie.entity';
import { Appointment } from '../../../appointment/appointment.entity';

interface TextElement {
  title: string;
  value: string;
}
@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(Neighborhood)
    private readonly nRepo: Repository<Neighborhood>,
    @InjectRepository(Specie) private readonly sRepo: Repository<Specie>
  ) {}

  async generateHeader(doc: PDFDocumnetWithTables) {
    doc.fontSize(11);
    doc.font('Helvetica');

    doc.image('./apps/backend/src/assets/logo.png', 690, 15, { width: 110 });
    doc.image('./apps/backend/src/assets/logo2.png', 30, 10, { width: 100 });
    doc.moveDown(2);

    doc.x = 15;
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

  generateRow(appointment: Appointment, id: number) {
    const columns: string[] = [
      (id + 1).toString(),
      appointment.surgeryNumber ? appointment.surgeryNumber.toString() : '',
      `${appointment.lastName} ${appointment.name}`,
      appointment.home,
      appointment.phone ? appointment.phone : '',
      appointment.incomeForm?.animalName
        ? appointment.incomeForm.animalName
        : '',
      appointment.incomeForm?.age ? appointment.incomeForm.age.toString() : '',
      appointment.specie.specie,
      appointment.sex == 'Macho' ? 'M' : 'H',
      appointment.incomeForm?.weight
        ? appointment.incomeForm.weight.toString()
        : '',
      appointment.incomeForm?.features ? appointment.incomeForm.features : '',
    ];

    console.log(columns, 'Columnas');
    return columns;
  }

  async newTable(doc: PDFDocumnetWithTables, registers: Appointment[]) {
    const headers = [
      { label: 'N°' },
      { label: 'N° Cirugía' },
      { label: 'Nombre y Apellido Propietario' },
      { label: 'Domicilio' },
      { label: 'Teléfono' },
      { label: 'Nombre Paciente' },
      { label: 'Edad' },
      { label: 'Especie' },
      { label: 'Sexo' },
      { label: 'Peso(KG)' },
      { label: 'Caracteristicas' },
      { label: 'Firma', width: 50 },
    ];

    doc.table(
      {
        headers: headers,
        rows: [
          ...registers.map((a, id) =>
            this.generateRow(a, id).map((item) => String(item))
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
