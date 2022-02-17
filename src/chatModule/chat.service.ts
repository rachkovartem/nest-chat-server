import {Repository} from 'typeorm';
import {Chat as ChatEntity} from './chat.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}

  createMessage = async (chatId: string, message: string) => {
    const newMessage = await this.chatRepository.create({message})
    return await this.chatRepository.save(newMessage);
  }
}