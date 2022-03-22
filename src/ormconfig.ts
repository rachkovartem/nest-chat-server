import { ConnectionOptions } from 'typeorm';
console.log(process.env.npm_lifecycle_event)
console.log(process.env.DATABASE_URL)

const config: ConnectionOptions = process.env.DATABASE_URL ? {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: {
    ssl: true,
    rejectUnauthorized: false,
  },
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} : {
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

};

export default config;
