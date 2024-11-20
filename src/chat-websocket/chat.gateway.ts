import { 
    WebSocketGateway, 
    WebSocketServer,
    SubscribeMessage, 
    OnGatewayConnection,
    OnGatewayDisconnect 
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Message } from './message.model';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private activeUsers: Map<string, string> = new Map();
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      const user = this.activeUsers.get(client.id);
      this.activeUsers.delete(client.id);
      this.server.emit('userLeft', user);
      console.log(`Client connected: ${client.id}`);
    }
  
    @SubscribeMessage('join')
    handleJoin(client: Socket, username: string) {
      this.activeUsers.set(client.id, username);
      this.server.emit('userJoined', username);
      return { event: 'joinResponse', data: `Bienvenido ${username}!` };
    }
  
    @SubscribeMessage('message')
    handleMessage(client: Socket, message: Omit<Message, 'timestamp'>): void {
      const fullMessage: Message = {
        ...message,
        timestamp: new Date()
      };
      this.server.emit('newMessage', fullMessage);
    }
  
    @SubscribeMessage('getActiveUsers')
    handleGetActiveUsers(): string[] {
      return Array.from(this.activeUsers.values());
    }
  }