import {
  MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {MessagesService} from "./messages.service";
import { Socket, Server } from 'socket.io';
import {Logger, Req} from "@nestjs/common";
import {messagePayloadDto} from "./messagePayload.dto";
import {JwtAuthGuard} from "../authModule/guards/jwt-auth.guard";
import {UseGuards} from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: MessagesService) {
  }

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('messages:add')
  async handleMessage(client: Socket, payload: messagePayloadDto) {
    const result = await this.chatService.createMessage('13287990-50b9-420b-9be9-753d133ec0af', payload);
    this.server.emit('messages:add', [{...result}]);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }


  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(JwtAuthGuard)
  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    const messages = await this.chatService.getAllRoomMessages('13287990-50b9-420b-9be9-753d133ec0af');
    this.server.emit('messages:get', [...messages]);
  }
}