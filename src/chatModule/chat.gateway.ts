import {
  MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {ChatService} from "./chat.service";
import { Socket, Server } from 'socket.io';
import {Logger} from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {
  }
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: string) {
    const result = await this.chatService.createMessage('13287990-50b9-420b-9be9-753d133ec0af', payload);
    console.log(result)
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('msgToClient', 'Connected to chat');
  }
}
