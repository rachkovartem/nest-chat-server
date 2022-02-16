import {
  Body,
  Controller,
  ForbiddenException,
  Get, Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { UsersService } from './users.service';

@Controller()
export class usersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  createItem(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Get('/profile')
  getProfileInfo(@Req() req, @Query ('id') id) {
    if (req.connection.remoteAddress === '::ffff:127.0.0.1') {
      return this.usersService.getUserById(id);
    }
    throw new ForbiddenException();
  }
}
