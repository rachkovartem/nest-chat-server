import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authModule/guards/jwt-auth.guard';
import {User} from "./user.entity";

@Controller()
export class usersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  createItem(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Get('/getUserById')
  getUserById(@Req() req, @Query('id') id) {
    if (
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1'
    ) {
      return this.usersService.getUserById(id);
    }
    throw new ForbiddenException();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/removeFriend')
  @UseInterceptors(FileInterceptor('file'))
  async removeFriend(@Body('idUser') idUser: string, @Body('idFriend') idFriend: string,) {
      return await this.usersService.removeFriend(idUser, idFriend)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const res = await this.usersService.updateUserImage(
        req.user.id,
        file.path,
      );
      return { path: file.path, result: res };
    }
  }
  
  @Get('/UsersImages/:filename')
  async getFile(
    @Param('filename') filename: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    res.sendFile(filename, { root: 'UsersImages' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/friendRequest')
  async friendRequest(
    @Body('idUser') idUser: string,
    @Body('idFriend') idFriend: string,
  ) {
    return await this.usersService.friendRequest(idUser, idFriend);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/approveFriendReq')
  async approveFriendReq(
    @Body('idUser') idUser: string,
    @Body('idFriend') idFriend: string,
    @Body('idReq') idReq: string,
  ) {
    return await this.usersService.approveFriendReq(idUser, idFriend, idReq);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rejectFriendReq')
  async rejectFriendReq(
    @Body('idUser') idUser: string,
    @Body('idFriend') idFriend: string,
    @Body('idReq') idReq: string,
  ) {
    return await this.usersService.rejectFriendReq(idUser, idFriend, idReq);
  }

  @Post('/getRequests')
  async getRequest(
    @Body('friendReqsArr') friendReqsArr: string[],
    @Body('userId') userId: string,
    @Req() req,
  ) {
    if (
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1'
    ) {
      return await this.usersService.getRequests(friendReqsArr, userId);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findUser')
  async findUser(@Query('option') option: string, @Query('id') id: string) {
    if (option.length === 0) {
      return []
    }
    return await this.usersService.findUser(option, id);
  }

  @Get('/allUsers')
  getAllUsers(@Req() req) {
    if (
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1'
    ) {
      return this.usersService.getAllUsers();
    }
    throw new ForbiddenException();
  }
}
