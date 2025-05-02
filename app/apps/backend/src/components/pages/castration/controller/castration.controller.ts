import { Body, Controller, Post } from '@nestjs/common';
import { CastrationService } from '../service/castration.service';
import type { CreateCastrationDTO } from '../DTOs/create-castration.DTO';

@Controller('castration')
export class CastrationController {
  constructor(private readonly castrationService: CastrationService) {}

  @Post('')
  async createCastration(@Body() body: CreateCastrationDTO) {
    return await this.castrationService.createCastration(body);
  }
  
}
