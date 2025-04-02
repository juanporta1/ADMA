import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAppoinmentDTO } from '../appoinment-DTOs/create-appoinment.dto';
import { AppoinmentService } from '../appoinment-service/appoinment.service';
import { UpdateAppoinmentDto } from '../appoinment-DTOs/update-appoinment.dto';

@Controller('appoinment')
export class AppoinmentController {

    constructor(private appoinmentService: AppoinmentService){}

    @Get("get-all")
    async getAllAppoinments(){
        return await this.appoinmentService.getAll()
    }

    @Post("create/bulk")
    async createAppoinments(@Body() body: CreateAppoinmentDTO[]){
        return await this.appoinmentService.createAppoinmentsBulk(body);
    }

    @Post("create/one")
    async createAnAppoinment(@Body() body: CreateAppoinmentDTO){
        return await this.appoinmentService.createOneAppoinment(body);
    }

    @Delete("delete/:id")
    async deleteAnAppoinment(@Param("id") id: string){
        return await this.appoinmentService.deleteAppoinment(Number(id))
    }

    @Patch("update/:id")
    async updateAnAppoiment(@Param("id") id: number ,@Body() body: UpdateAppoinmentDto){
        return await this.appoinmentService.updateAppoinment(Number(id), body);
    }

}
