import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from '../components/datasource/datasource.module';
import { AppoimentModule } from '../components/pages/appointment/appointment.module';
import { DataEntitiesModule } from '../components/data-entities/data-entities.module';
import { IncomeForm } from '../components/pages/income-form/income-form.entity';
import { Castration } from '../components/pages/castration/castration.entity';
import { SchedulesModule } from '../components/schedule/schedule.module';

@Module({
  imports: [DataSourceModule, AppoimentModule, DataEntitiesModule, IncomeForm, Castration, SchedulesModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
