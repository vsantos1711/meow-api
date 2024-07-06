import { DataSourceOptions, DataSource } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  entities: ['**/*.entity{.ts,.js}'],
  migrations: ['src/shared/db/typeorm/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;