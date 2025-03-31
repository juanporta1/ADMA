import { Body, Controller, Post } from '@nestjs/common';
import { CreateAppoinmentDTO } from '../../DTOs/appoinment.dto';
import { AppoinmentService } from '../../services/appoinment/appoinment.service';

@Controller('appoinment')
export class AppoinmentController {

    constructor(private appoinmentService: AppoinmentService){}
    @Post("create")
    async createAnAppoinment(@Body() body: CreateAppoinmentDTO){
        this.appoinmentService.createAppoinment(body);
    }

}
