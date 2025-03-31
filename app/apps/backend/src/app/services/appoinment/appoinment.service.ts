import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateAppoinmentDTO } from '../../DTOs/appoinment.dto';
import { Appoinment } from '../../entities/appoinment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppoinmentService {

    constructor(@InjectRepository(Appoinment) private appoinmentRepository: Repository<Appoinment>){}

    async createAppoinment(appoinment: CreateAppoinmentDTO){
        try{
            const newAppoinment = this.appoinmentRepository.create(appoinment);
            this.appoinmentRepository.save(newAppoinment);
        }catch(error){
            throw error;
        }
    }

}
