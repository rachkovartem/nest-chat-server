import {Repository} from 'typeorm';
import {Room as RoomsEntity} from './rooms.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsEntity)
    private roomsRepository: Repository<RoomsEntity>,
  ) {}

  async createRoom () {

  }

}