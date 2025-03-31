import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv';
import { Appoinment } from '../entities/appoinment.entity';

dotenv.config()



@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    username: process.env.DB_USER,
    password:process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    entities:[Appoinment],
    synchronize: true,
    autoLoadEntities: true,
    ssl: {
      rejectUnauthorized: false
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
