import {
  Body,
  Controller,
  ForbiddenException,
  Get, Param,
  Post,
  Query,
  Req, Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {CreateUserDto} from './createUser.dto';
import {UsersService} from './users.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../authModule/guards/jwt-auth.guard";

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

  @UseGuards(JwtAuthGuard)
  @Post('/uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const res = await this.usersService.updateUserImage( req.user.id, file.path )
      return {path: file.path, result: res};
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/UsersImages/:filename')
  async getFile(@Param("filename") filename: string, @Req() req: any, @Res() res: any) {
      res.sendFile(filename, { root: 'UsersImages'});
  }

  @UseGuards(JwtAuthGuard)
  @Post('/friendRequest')
  async friendRequest(@Body("id1") id1: string, @Body("id2") id2: string,) {
    return await this.usersService.friendRequest(id1, id2)
  }

  @Post('/getRequests')
  async getRequest(@Body('idsArr') idsArr: string[], @Body('id') id: string, @Req() req) {
    if (req.connection.remoteAddress === '::ffff:127.0.0.1') {
      return await this.usersService.getRequests(idsArr, id);
    }
  }

  @Get('/allUsers')
  getAllUsers(@Req() req) {
    if (req.connection.remoteAddress === '::ffff:127.0.0.1') {
      return this.usersService.getAllUsers();
    }
    throw new ForbiddenException();
  }
}
