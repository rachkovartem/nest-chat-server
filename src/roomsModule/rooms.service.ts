import {Repository} from 'typeorm';
import {Room as RoomsEntity} from './rooms.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {User as UserEntity} from "../usersModule/user.entity";
import {UsersService} from "../usersModule/users.service";


@Injectable()
export class RoomsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(RoomsEntity)
    private roomsRepository: Repository<RoomsEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createRoom (participants: string[]) {
    const res = await this.roomsRepository.find({participants: participants.sort().toString()})
    if (res.length === 0) {
      const newRoom = this.roomsRepository.create({
        participants: participants.sort().toString(),
        groupRoom: false,
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

  async createGroupRoom(participants: {username: string, id: string}[], idUser: string) {
    if (participants.length < 3) {
      return 'threeOrMore'
    }
    const participantsIds = participants.map(member => member.id).sort().toString();
    const res = await this.roomsRepository.find({participants: participantsIds});
    console.log(participantsIds)
    console.log('res', res)
    if (res.length === 0) {
      const newRoom = await this.roomsRepository.create({
        participants: participantsIds,
        groupRoom: true,
        creationDate: Date.now().toString()
      });
      const roomRes = await this.roomsRepository.save(newRoom);
      await Promise.all(participants.map(async user => {
        const profile = await this.usersRepository.findOne({ id: user.id })
        const newRooms = [...profile.groupRooms, roomRes.roomId];
        await this.usersRepository.update({id: user.id}, { groupRooms: newRooms})
      }))
      const userAfterUpdate = await this.usersService.getUserById(idUser);
      return {roomRes, fullGroupRooms: userAfterUpdate.fullGroupRooms};
    } else if (res.length === 1 && !res[0].groupRoom) {
      return res[0]
    } else if (res.length === 1 && res[0].groupRoom) {
      return 'groupAlreadyExists'
    } else {
      console.log('error, found more then 1 room');
      return 'smthWrong';
    }
  }

  async getRoomInfo(roomId: string) {
    const room = await this.roomsRepository.findOne({roomId});
    const participants = await Promise.all(room.participants.split(',').map(async id => {
      return await this.usersRepository.findOne({id})
    }));
    const avatars = {};
    participants.forEach(user => {
      avatars[user.id] = user.imagePath
    })
    return {...room, participants, avatars}
  }
}