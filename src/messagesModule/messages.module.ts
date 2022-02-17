import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./messages.entity";
import {MessagesService} from "./messages.service";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}