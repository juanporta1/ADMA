import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Appoinment } from './apps/backend/src/assets/components/appoiment/appoinment.entity'; // ajustá la ruta si hace falta

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Appoinment],
  migrations: ['src/assets/migrations/*.ts'], // dónde se guardarán las migraciones
  synchronize: false,
  ssl: { rejectUnauthorized: false }
});