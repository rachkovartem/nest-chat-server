import {Repository} from 'typeorm';
import {Room as RoomsEntity} from './rooms.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {createRoomDto} from "./createRoom.dto";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../authModule/guards/jwt-auth.guard";


@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsEntity)
    private roomsRepository: Repository<RoomsEntity>,
  ) {}

  async createRoom (participants: string[]) {
    const res = await this.roomsRepository.find({participants: participants.sort().toString()})
    if (res.length === 0) {
      const newRoom = this.roomsRepository.create({
        participants: participants.sort().toString(),
        creationDate: Date.now().toString()
      })
      return await this.roomsRepository.save(newRoom);
    } else if (res.length === 1) {
      return res[0]
    } else {
      console.log('error, found more then 1 room');
      return 'error, found more then 1 room';
    }
  }

}