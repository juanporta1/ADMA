import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DataEntitiesService } from '../services/data-entities.service';

@Controller('data-entities')
export class DataEntitiesController {
  constructor(private dataService: DataEntitiesService) {}

  @Get('specie')
  async getSpecies() {
    return await this.dataService.getSpecies();
  }

  @Post('specie')
  async createSpecie(@Body() body: { specie: string }) {
    console.log(body);
    return await this.dataService.createSpecie(body);
  }

  @Get('neighborhood')
  async getNeighborhoods() {
    return await this.dataService.getNeighborhoods();
  }

  @Post('neighborhood')
  async createNeighborhood(@Body() body: { neighborhood: string }) {
    console.log(body);
    return await this.dataService.createNeighborhood(body);
  }

  @Post('neighborhood/bulk')
  async createNeighborhoodsBulk(
    @Body() body:  { neighborhood: string }[]
  ) {
    console.log(body);
    return await this.dataService.createNeighborhoodsBulk(body);
  }

  @Get('reason')
  async getReasons() {
    return await this.dataService.getReasons();
  }

  @Post('reason')
  async createReason(@Body() body: { reason: string }) {
    console.log(body);
    return await this.dataService.createReason(body);
  }

  @Post("reason/bulk")
  async createReasonsBulk(@Body() body: { reason: string }[]) {
    console.log(body);
    return await this.dataService.createReasonsBulk(body);
  }

  @Get('user')
  async getUsers(@Query() querys: {email?: string}) {
    if(querys.email) return await this.dataService.getUserByEmail(querys.email);
    else return await this.dataService.getUsers();
  }

  @Post('user')
  async createUser(@Body() body: {email: string, role: string}) {
    console.log(body);
    return await this.dataService.createUser(body);
  }
}
