import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/typeorm.module';
import { AppoinmentController } from './controllers/appoinment/appoinment.controller';
@Module({
  imports: [TypeOrmModule],
  controllers: [AppController, AppoinmentController],
  providers: [AppService],
})
export class AppModule {}
