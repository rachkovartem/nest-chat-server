import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../usersModule/user.entity";
import {Chat} from "./chat.entity";
import {ChatService} from "./chat.service";

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}