import { ConnectionOptions } from 'typeorm';
console.log(process.env.npm_lifecycle_event)
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
  host: 'ec2-54-76-249-45.eu-west-1.compute.amazonaws.com',
  port: 5432,
  username: 'kxsbfojdzhmzpx',
  password: '5dfcdfcfa54be27f6b5da031ea35cbd304229ff19d3dc24ae46bca205f47a6fc',
  database: 'dep5ke4na717s0',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
