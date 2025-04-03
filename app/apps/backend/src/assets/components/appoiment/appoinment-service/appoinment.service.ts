import { Injectable } from '@nestjs/common';
import { DataSource, Filter, Repository } from 'typeorm';
import { CreateAppoinmentDTO } from '../appoinment-DTOs/create-appoinment.dto';
import { Appoinment } from '../appoinment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAppoinmentDto } from '../appoinment-DTOs/update-appoinment.dto';
import { all } from 'axios';
import { FilterAppoinmentDto } from '../appoinment-DTOs/filter-appoinment.dto';

@Injectable()
export class AppoinmentService {

    constructor(@InjectRepository(Appoinment) private appoinmentRepository: Repository<Appoinment>){}

    async getAll(querys: FilterAppoinmentDto | null = null){
        
        if (querys){
            return await this.appoinmentRepository.findBy({...querys})
        }else{
            return await this.appoinmentRepository.find();
        }
    }
    async createAppoinmentsBulk(appoinments: CreateAppoinmentDTO[]): Promise<Appoinment[]>{
        
            const allAppoinments: Appoinment[] = [];
            appoinments.forEach(async (appoinment) => {
                try{
                    const newAppoinment = this.appoinmentRepository.create(appoinment);
                    await this.appoinmentRepository.save(newAppoinment);
                    allAppoinments.push(newAppoinment);
                }catch(error){
                    throw error;
                }
            })
            return allAppoinments;
    }

    async createOneAppoinment(appoinment: CreateAppoinmentDTO): Promise<Appoinment>{
        try{
            const newAppoinment = await this.appoinmentRepository.create(appoinment);
            return await this.appoinmentRepository.save(newAppoinment);
            
        }catch(error){
            throw error
        }
    }

    async deleteAppoinment(id: number){
        try{
            return await this.appoinmentRepository.delete(id);
        }catch(error){
            throw error
        }
    }

    async updateAppoinment(id: number, updatedAppoinment: UpdateAppoinmentDto){
        try{
            return await this.appoinmentRepository.update(id, updatedAppoinment);
        }catch(error){
            throw error;
        }
    }

}
