import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateAppoinmentDTO } from '../appoinment-DTOs/create-appoinment.dto';
import { AppoinmentService } from '../appoinment-service/appoinment.service';
import { UpdateAppoinmentDto } from '../appoinment-DTOs/update-appoinment.dto';
import { FilterAppoinmentDto } from '../appoinment-DTOs/filter-appoinment.dto';
import { QueryBuilder, ReturnDocument } from 'typeorm';

@Controller('appoinment')
export class AppoinmentController {

    constructor(private appoinmentService: AppoinmentService){}

    @Get("")
    async getAppoinments(@Query() querys: FilterAppoinmentDto){
        console.log("Query Params:", querys);
        return await this.appoinmentService.getAll(querys); 
    }

    @Post("bulk")
    async createAppoinments(@Body() body: CreateAppoinmentDTO[]){
        return await this.appoinmentService.createAppoinmentsBulk(body);
    }

    @Post("")
    async createAnAppoinment(@Body() body: CreateAppoinmentDTO){
        return await this.appoinmentService.createOneAppoinment(body);
    }

    @Delete(":id")
    async deleteAnAppoinment(@Param("id") id: string){
        return await this.appoinmentService.deleteAppoinment(Number(id))
    }

    @Put(":id")
    async updateAnAppoiment(@Param("id") id: number ,@Body() body: UpdateAppoinmentDto){
        return await this.appoinmentService.updateAppoinment(Number(id), body);
    }

}
