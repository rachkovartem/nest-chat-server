import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../usersModule/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    let res;
    if (user) {
      res = await bcrypt.compare(pass, user.password);
    }
    if (user && res) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: any) {
    const user = await this.usersService.findOne(payload.email);
    const signPayload = { username: payload.email, sub: user.id };
    if (user) {
      return {
        access_token: this.jwtService.sign(
          { ...signPayload },
          { expiresIn: jwtConstants.jwtAccessExpire },
        ),
        refresh_token: this.jwtService.sign(
          { ...signPayload },
          { expiresIn: jwtConstants.jwtRefreshExpire },
        ),
        email: user.email,
        id: user.id,
      };
    } else {
      return null;
    }
  }

  async refreshAccessToken(payload: any) {
    const signPayload = { username: payload.username, sub: payload.sub };
    return {
      access_token: this.jwtService.sign(
        { ...signPayload },
        { expiresIn: jwtConstants.jwtAccessExpire },
      ),
    };
  }

  cookieExtractor(req, type) {
    let token = null;
    let decoded = null;
    if (req && req.cookies) {
      token = req.cookies[`${type}_token`];
      decoded = this.jwtService.decode(token);
    }
    return { token, decoded };
  }


}
