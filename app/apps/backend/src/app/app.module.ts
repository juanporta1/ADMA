import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from '../assets/datasource/datasource.module';
import { AppoimentModule } from '../assets/components/appoiment/appoiment.module';

@Module({
  imports: [DataSourceModule, AppoimentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
