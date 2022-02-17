import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {RoomsService} from "./rooms.service";
import {JwtAuthGuard} from "../authModule/guards/jwt-auth.guard";


@Controller()
export class roomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/rooms/create_room')
  createRoom(@Req() req) {

  }

}
