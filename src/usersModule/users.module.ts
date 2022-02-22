import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { usersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MulterModule} from "@nestjs/platform-express";
import {FriendRequest} from "./friendRequest.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FriendRequest]),
    MulterModule.register(
      {
        dest: './UsersImages',
      }
    )
  ],
  providers: [UsersService],
  controllers: [usersController],
  exports: [UsersService],
})
export class UsersModule {}
