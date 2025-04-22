import { Injectable } from '@nestjs/common';
import PDFDocumnetWithTables from 'pdfkit-table';
import { FilterAppointmentDto } from '../../appointment-DTOs/filter-appointment.dto';
import { Appointment } from '../../appointment.entity';



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
    generateRow(doc: PDFDocumnetWithTables, appointment: Appointment, id: number) {
        const neighborhoodName = appointment.neighborhood?.neighborhood || 'No especificado';
        const specieName = appointment.specie?.specie || 'No especificado';
        
        doc.table({
            rows: [[
                id.toString(), 
                appointment.lastName, 
                appointment.name, 
                appointment.dni, 
                neighborhoodName,
                appointment.home, 
                appointment.sex, 
                appointment.size, 
                specieName
            ]]
        }, {
            columnsSize: [30, 130, 130, 130, 130, 130, 50, 60, 47],
        });
        
        const obs = appointment.observations?.trim() || '';
        doc.table({
            rows: [["Observaciones", obs]]
        });
    }

    async newTable(doc: PDFDocumnetWithTables) {
        doc.x = 15;
        doc.table({
            headers: [
                { label: "N°", property: "number", width: 30 },
                { label: "Apellido", property: "lastName", width: 130 },
                { label: "Nombre", property: "name", width: 130 },
                { label: "DNI", property: "dni", width: 130 },
                { label: "Barrio", property: "neighborhood", width: 130 },
                { label: "Domicilio", property: "home", width: 130 },
                { label: "Sexo", property: "sex", width: 50 },
                { label: "Tamaño", property: "size", width: 60 },
                { label: "Especie", property: "specie", width: 47 }
            ],
            
        })
    }

}
