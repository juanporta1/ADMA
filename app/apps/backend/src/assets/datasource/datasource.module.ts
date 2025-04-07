import { Global, Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { Appoinment } from "../components/appoiment/appoinment.entity";

dotenv.config()

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            inject: [],
            useFactory: async () => {
                try{
                    const dataSource = new DataSource({
                        type:"postgres",
                        username: process.env.DB_USER,
                        password:process.env.DB_PASS,
                        host: process.env.DB_HOST,
                        database: process.env.DB_NAME,
                        port:5432,
                        entities:[Appoinment],
                        synchronize: true,
                        ssl:{rejectUnauthorized: false }
                    });
                    await dataSource.initialize();
                    console.log("DataSource initialized successfully");
                    return dataSource;
                }
                catch(error){
                    throw error
                }
            }

        }
    ],
    exports:[DataSource]
})
export class DataSourceModule{}