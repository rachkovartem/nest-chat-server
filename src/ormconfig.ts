import { ConnectionOptions } from 'typeorm';
import * as PostgressConnectionStringParser from "pg-connection-string";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

const databaseUrl: string = process.env.DATABASE_URL;
console.log(databaseUrl)
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
const config: ConnectionOptions = process.env.npm_lifecycle_event === 'start:dev' ? {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'chatapp',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} : {
  type: 'postgres',
  host: connectionOptions.host,
  port: connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
