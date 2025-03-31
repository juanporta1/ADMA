import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appoinment } from './appoinment.entity';
import { AppoinmentService } from './appoinment-service/appoinment.service';
import { AppoinmentController } from './appoinment-controller/appoinment.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Appoinment])],
    controllers: [AppoinmentController],
    providers: [AppoinmentService],

})
export class AppoimentModule {}
