import { Module } from '@nestjs/common';
import { Neighborhood } from './entities/neighborhood.entity';
import { Specie } from './entities/specie.entity';
import { Reason } from './entities/reason.entity';
import { DataEntitiesController } from './controller/data-entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntitiesService } from './services/data-entities.service';

@Module({
    imports:[TypeOrmModule.forFeature([Neighborhood, Specie, Reason])],
    controllers: [DataEntitiesController],
    providers: [DataEntitiesService],
})
export class DataEntitiesModule {}
