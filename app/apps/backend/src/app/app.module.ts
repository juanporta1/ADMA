import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from '../components/datasource/datasource.module';
import { AppoimentModule } from '../components/pages/appoiment/appoiment.module';

@Module({
  imports: [DataSourceModule, AppoimentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
