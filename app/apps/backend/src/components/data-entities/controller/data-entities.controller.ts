import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataEntitiesService } from '../services/data-entities.service';

@Controller('data-entities')
export class DataEntitiesController {
    constructor(private dataService: DataEntitiesService){}

    @Get("specie")
    async getSpecies(){
        return await this.dataService.getSpecies();
    }

    @Post("specie")
    async createSpecie(@Body() body: {specie: string}){
        console.log(body);
        return await this.dataService.createSpecie(body)
    }

    @Get("neighborhood")
    async getNeighborhoods(){
        return await this.dataService.getNeighborhoods();
    }

    @Post("neighborhood")
    async createNeighborhood(@Body() body: {neighborhood: string}){
        console.log(body);
        return await this.dataService.createNeighborhood(body)
    }

    @Get("reason")
    async getReasons(){
        return await this.dataService.getResons();
    }

    @Post("reason")
    async createReason(@Body() body: {reason: string}){
        console.log(body);
        return await this.dataService.createReason(body)
    }
}
