import {Injectable, Query, Req} from '@nestjs/common';
import {CreateUserDto} from './createUser.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User as UserEntity} from './user.entity';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createUser = async (item: CreateUserDto) => {
    const exist = await this.usersRepository.find({ email: item.email });
    if (exist.length === 0) {
      const newItem: { password: string; username: string; registration: string; email: string } =
        { registration: '', ...item };
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
}
