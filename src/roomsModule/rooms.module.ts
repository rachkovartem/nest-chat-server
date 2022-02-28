import { Module } from '@nestjs/common';
import {Room} from "./rooms.entity";
import { roomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../usersModule/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Room, User])],
  providers: [RoomsService],
  controllers: [roomsController],
  exports: [RoomsService],
})
export class RoomsModule {}