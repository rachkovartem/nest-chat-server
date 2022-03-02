import { Module } from '@nestjs/common';
import {Room} from "./rooms.entity";
import { roomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../usersModule/user.entity";
import {UsersService} from "../usersModule/users.service";
import {UsersModule} from "../usersModule/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Room, User]), UsersModule],
  providers: [RoomsService],
  controllers: [roomsController],
  exports: [RoomsService],
})
export class RoomsModule {}