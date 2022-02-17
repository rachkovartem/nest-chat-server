import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './authModule/auth.service';
import { UsersService } from './usersModule/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './authModule/constants';
import { AuthModule } from './authModule/auth.module';
import { UsersModule } from './usersModule/users.module';
import { ChatModule } from "./chatModule/chat.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { User } from './usersModule/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    UsersModule,
    ChatModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
      secretOrPrivateKey: jwtConstants.secret,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    UsersService,
  ],
})
export class AppModule {}
