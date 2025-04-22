import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from '../components/datasource/datasource.module';
import { AppoimentModule } from '../components/pages/appoiment/appointment.module';
import { DataEntitiesModule } from '../components/data-entities/data-entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DataSourceModule, AppoimentModule, DataEntitiesModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
