import { Controller, Get } from '@nestjs/common';
import { DataEntitiesService } from '../services/data-entities.service';

@Controller('data-entities')
export class DataEntitiesController {
    constructor(private dataService: DataEntitiesService){}

    @Get("specie")
    async getSpecies(){
        return await this.dataService.getSpecies();
    }
}
