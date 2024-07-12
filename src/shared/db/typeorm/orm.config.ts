import { DataSourceOptions, DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import 'dotenv/config';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/shared/db/typeorm/migrations/*{.ts,.js}'],
  seeds: ['dist/shared/db/typeorm/seeds/*{.ts,.js}'],
}

export default new DataSource(dataSourceOptions);