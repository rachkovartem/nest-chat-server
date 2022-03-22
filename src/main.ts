import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
const cors = require('cors')

const corsOptions = {
  // origin: ['http://localhost:3000', 'https://nextchat-app.herokuapp.com', '193.176.84.208'],
  credentials: true,
  // optionSuccessStatus: 200,
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Origin', 'Content-Type, Accept');
  } );
  await app.listen(process.env.PORT || 8080, () => console.log(process.env.PORT));
}
bootstrap();
