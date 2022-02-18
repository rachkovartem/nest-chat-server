import {Repository} from 'typeorm';
import {Message as MessagesEntity} from './messages.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {messagePayloadDto} from "./messagePayload.dto";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private messagesRepository: Repository<MessagesEntity>,
  ) {}

  createMessage = async (payload: messagePayloadDto) => {
    const newMessage = await this.messagesRepository.create({
      roomId: payload.roomId,
      senderId: payload.id,
      senderUsername: payload.username,
      message: payload.message,
      sendingDate: Date.now().toString()
    })
    return await this.messagesRepository.save(newMessage);
  }

  getAllRoomMessages = async (roomId: string) => {
    return await this.messagesRepository.find({roomId});
  }
}