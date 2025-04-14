import { Global, Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { Appoinment } from "../../components/appoiment/appoinment.entity";

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
                        url: process.env.DB_HOST,
                        entities:[Appoinment],
                        synchronize: true,
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