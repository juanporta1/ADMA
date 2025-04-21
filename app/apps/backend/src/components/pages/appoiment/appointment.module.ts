import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appoinment-service/appointment.service';
import { AppointmentController } from './appointment-controller/appointment.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Appointment])],
    controllers: [AppointmentController],
    providers: [AppointmentService],

})
export class AppoimentModule {}
