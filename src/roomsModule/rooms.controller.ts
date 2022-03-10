import {Body, Controller, ForbiddenException, Get, Post, Req, UseGuards} from '@nestjs/common';
import {RoomsService} from "./rooms.service";
import {JwtAuthGuard} from "../authModule/guards/jwt-auth.guard";


@Controller()
export class roomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/rooms/createRoom')
  async createRoom(@Body('participants') participants) {
    const res = await this.roomsService.createRoom(participants);
    return res
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rooms/createGroupRoom')
  async createGroupRoom(@Body('members') members, @Body('idUser') idUser) {
    return await this.roomsService.createGroupRoom(members, idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rooms/getAllRoomsIds')
  async getAllRoomsIds(@Body('idUser') idUser) {
    return await this.roomsService.getAllRoomsIds(idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rooms/getLastMessages')
  async getLastMessages(
    @Body('userId') userId) {
    return await this.roomsService.getLastMessages(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rooms/getAllUserRooms')
  async getAllUserRooms(
    @Body('userId') userId) {
    return await this.roomsService.getAllUserRooms(userId);
  }

  @Post('/rooms/getRoomInfo')
  async getRoomInfo(@Req() req, @Body('id') id) {
    if (
      req.connection.remoteAddress === '::ffff:127.0.0.1' ||
      req.connection.remoteAddress === '::1'
    ) {
      return await this.roomsService.getRoomInfo(id);
    }
    throw new ForbiddenException();
  }
}
