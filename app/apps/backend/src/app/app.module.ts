import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from '../components/datasource/datasource.module';
import { AppoimentModule } from '../components/pages/appointment/appointment.module';
import { DataEntitiesModule } from '../components/data-entities/data-entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeForm } from '../components/pages/income-form/income-form.entity';
import { Castration } from '../components/pages/castration/castration.entity';

@Module({
  imports: [DataSourceModule, AppoimentModule, DataEntitiesModule, IncomeForm, Castration],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
