import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './createUser.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User as UserEntity} from './user.entity';
import {FriendRequest as FriendRequestEntity} from './friendRequest.entity'
import * as bcrypt from 'bcrypt';

export type User = any;

interface newItem {
  password: string;
  username: string;
  registration: string;
  email: string,
  imagePath: string,
  friends: string[],
  friendsRequests: string[]
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(FriendRequestEntity)
    private friendRequestRepository: Repository<FriendRequestEntity>,
  ) {}

  createUser = async (item: CreateUserDto) => {
    const existEmail = await this.usersRepository.find({ email: item.email });
    const existUsername = await this.usersRepository.find({ username: item.username });
    if (existEmail.length === 0 || existUsername.length === 0) {
      const newItem: newItem =
        { registration: '', imagePath: '', friends: [], friendsRequests: [],  ...item };
      newItem.password = await bcrypt.hash(item.password, 10);
      newItem.registration = Date.now().toString();
      const newUser = this.usersRepository.create(newItem);
      const result = await this.usersRepository.save(newUser);
      return { status: 'successfully', id: result.id };
    } else {
      return { status: 'already exist' };
    }
  };

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOne({ id });
  }

  async getAllUsers() {
    return await this.usersRepository.find()
  }

  async updateUserImage(id: string, imagePath: string) {
    return await this.usersRepository.update({ id }, { imagePath });
  }

  async friendRequest(idSender: string, idRecipient: string) {
    const newReq = this.friendRequestRepository
      .create({
        userSenderId: idSender,
        userRecipientId: idRecipient,
        userRecipientStatus: false
      });
    const res = await this.friendRequestRepository
      .find({
        userSenderId: idSender,
        userRecipientId: idRecipient
      });
    console.log(res)
    if (res.length === 0) {
      const res = await this.friendRequestRepository.save(newReq);
      const user = await this.usersRepository.findOne({id: idSender});
      const resUpdateSender = await this.usersRepository
        .update(
          {id: idSender},
          {friendsRequests: [...user.friendsRequests, res.id]}
        );
      const resUpdateRecipient = await this.usersRepository
        .update(
          {id: idRecipient},
          {friendsRequests: [...user.friendsRequests, res.id]}
        );
      return {resUpdateSender, resUpdateRecipient}
    } else {
      return 'request already exist'
    }
  }

  async getRequests (idsArr: string[], id: string) {
    const allRequests =  await Promise.all(idsArr.map(async id => {
      return await this.friendRequestRepository.findOne({id})
    }))
    const reqUsersId = [];
    const inReqs = [];
    const outReqs = [];
    allRequests.forEach( req => {
      if (req.userSenderId === id) {
        outReqs.push(req);
        reqUsersId.push(req.userRecipientId);
      } else {
        inReqs.push(req);
        reqUsersId.push(req.userSenderId);
      }
    })
    const reqUsers = {}
      await Promise.all(reqUsersId.map(async id => {
      const user = await this.usersRepository.findOne({id})
        reqUsers[user.id] = user;
    }))

    return {inReqs, outReqs, reqUsers}
  }
}
