import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
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
  async createGroupRoom(@Body('members') members) {
    return await this.roomsService.createGroupRoom(members);
  }
}
