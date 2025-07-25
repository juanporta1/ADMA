import { Injectable } from '@nestjs/common';
import PDFDocumnetWithTables from 'pdfkit-table';
import { Appointment } from '../../../appointment/appointment.entity';
import PDFDocumentWithTables from 'pdfkit-table';

@Injectable()
export class PdfServiceIncome {
  constructor() {}

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
    let columns: string[] = [];
    if (appointment.status != 'Realizado')
      columns = [
        (id + 1).toString(),
        appointment.surgeryNumber ? appointment.surgeryNumber.toString() : ' ',
        `${appointment.lastName} ${appointment.name}`,
        appointment.home.toString(),
        appointment.phone ? appointment.phone.toString() : ' ',
        appointment.incomeForm?.animalName
          ? appointment.incomeForm.animalName.toString()
          : ' ',
        appointment.incomeForm?.age
          ? appointment.incomeForm.age.toString()
          : ' ',
        appointment.specie.specie.toString(),
        appointment.sex == 'Macho' ? 'M' : 'H',
        appointment.incomeForm?.weight
          ? appointment.incomeForm.weight.toString()
          : ' ',
        appointment.incomeForm?.features
          ? appointment.incomeForm.features.toString()
          : ' ',
      ];
    else
      columns = [
        (id + 1).toString(),
        appointment.surgeryNumber ? appointment.surgeryNumber.toString() : ' ',
        `${appointment.lastName} ${appointment.name}`,
        appointment.home.toString(),
        appointment.phone ? appointment.phone.toString() : ' ',
        appointment.castration?.animalName
          ? appointment.castration.animalName.toString()
          : ' ',
        appointment.castration?.age
          ? appointment.castration.age.toString()
          : ' ',
        appointment.specie.specie.toString(),
        appointment.sex == 'Macho' ? 'M' : 'H',
        appointment.castration?.weight
          ? appointment.castration.weight.toString()
          : ' ',
        appointment.castration?.features
          ? appointment.castration.features.toString()
          : ' ',
      ];
    // console.log(columns, 'Columnas');
    return columns;
  }

  async newTable(
    doc: PDFDocumnetWithTables,
    registers: Appointment[],
    addFooter: (doc: PDFDocumentWithTables) => void
  ) {
    const headers = [
      { label: 'N°', property: 'id', width: 20 },
      { label: 'N° Cirugía', property: 'surgeryNumber', width: 60 },
      {
        label: 'Nombre y Apellido Propietario',
        property: 'ownerName',
        width: 110,
      },
      { label: 'Domicilio', property: 'home', width: 80 },
      { label: 'Teléfono', property: 'phone', width: 80 },
      { label: 'Nombre Paciente', property: 'animalName', width: 100 },
      { label: 'Edad', property: 'age', width: 30 },
      { label: 'Especie', property: 'specie', width: 60 },
      { label: 'Sexo', property: 'sex', width: 30 },
      { label: 'Peso(KG)', property: 'weight', width: 40 },
      { label: 'Caracteristicas', property: 'features', width: 100 },
      { label: 'Firma', property: 'signature', width: 100 },
    ];

    doc.table(
      {
        headers: headers,
        rows: [
          ...registers
            .filter((a) =>
              [
                'Pendiente',
                'Esperando Actualización',
                'En Proceso',
                'Realizado',
              ].includes(a.status)
            )
            .map((a, id) =>
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
