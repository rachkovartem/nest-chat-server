import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./messages.entity";
import {MessagesService} from "./messages.service";
import {UsersModule} from "../usersModule/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
  controllers: [],
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService]
})
export class MessagesModule {}