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
  constructor(private readonly messagesService: MessagesService) {
  }

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('system:connect')
  async connection(client: Socket, payload) {
    client.join(payload.roomId);
    this.server.to(payload.roomId).emit('system:connected', `User ${payload.id} connected to room ${payload.roomId}`)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('messages:add')
  async handleMessage(client: Socket, payload: messagePayloadDto) {
    const result = await this.messagesService.createMessage(payload);
    this.server.to(payload.roomId).emit('messages:add', [{...result}]);
  }

  @SubscribeMessage('messages:get')
  async getMessage(client: Socket, payload) {
    const messages = await this.messagesService.getAllRoomMessages(payload.roomId);
    this.server.to(payload.roomId).emit('messages:get', [...messages]);
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
  }
}