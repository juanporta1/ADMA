import { Injectable } from '@nestjs/common';
import PDFDocumnetWithTables from 'pdfkit-table';
import { FilterAppointmentDto } from '../../appointment-DTOs/filter-appointment.dto';
import { Appointment } from '../../appointment.entity';
import { register } from 'module';



@Injectable()
export class PdfService {
    async generateHeader(doc: PDFDocumnetWithTables) {
        doc.fontSize(11),
            doc.font('Helvetica');
        doc.text(`Municipalidad de Alta Gracia 
    Programa Municipal de Salud Animal`, {
            align: 'center',
        });
        doc.image('./apps/backend/src/assets/logo.png', 690, 15, { width: 110 });
        doc.image('./apps/backend/src/assets/logo2.png', 30, 10, { width: 100 });
        doc.moveDown(2);
    }

    async generateFooter(doc: PDFDocumnetWithTables) {

    }

    generateRow(appointment: Appointment, id: number) {
        return [(id + 1).toString(), appointment.lastName, appointment.name, appointment.dni, appointment?.phone || "Sin Telefono", appointment.neighborhood?.neighborhood || " ", appointment.home, appointment.sex, appointment.size, appointment.specie?.specie || " ", appointment.status, appointment?.reason || "Sin Rázon", appointment?.observations || "Sin Observaciones"]
    }

    async newTable(doc: PDFDocumnetWithTables, registers: Appointment[]) {
        const registersPerPage = 15
        doc.table({
            headers: [
                { label: "N°", property: "number" },
                { label: "Apellido", property: "lastName" },
                { label: "Nombre", property: "name" },
                { label: "DNI", property: "dni" },
                { label: "Teléfono", property: "phone" },
                { label: "Barrio", property: "neighborhood" },
                { label: "Domicilio", property: "home" },
                { label: "Sexo", property: "sex" },
                { label: "Tamaño", property: "size" },
                { label: "Especie", property: "specie" },
                { label: "Estado", property: "status" },
                { label: "Razon", property: "reason" },
                { label: "Observaciones", property: "obs" }
            ],
            rows: [...registers.map((a, id) => (this.generateRow(a, id)))]

        }, {
            minRowHeight: 30,
            padding: [1, 1, 1, 1]
        })

    }

}
