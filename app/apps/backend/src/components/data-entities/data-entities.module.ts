import { Module } from '@nestjs/common';
import { Neighborhood } from './entities/neighborhood.entity';
import { Specie } from './entities/specie.entity';
import { Reason } from './entities/reason.entity';
import { DataEntitiesController } from './controller/data-entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntitiesService } from './services/data-entities.service';
import { ResidualNumber } from './entities/residual-number.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Neighborhood, Specie, Reason, ResidualNumber])],
    controllers: [DataEntitiesController],
    providers: [DataEntitiesService],
    exports: [TypeOrmModule]
})
export class DataEntitiesModule {}
