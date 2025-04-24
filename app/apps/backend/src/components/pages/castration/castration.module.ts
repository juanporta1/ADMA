import { Module } from '@nestjs/common';
import { CastrationService } from './service/castration.service';
import { CastrationController } from './controller/castration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Castration } from './castration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Castration])],
  providers: [CastrationService],
  controllers: [CastrationController],
  exports: [TypeOrmModule]
})
export class CastrationModule {}
