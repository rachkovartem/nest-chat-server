import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { usersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [usersController],
  exports: [UsersService],
})
export class UsersModule {}
