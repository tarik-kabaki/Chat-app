import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    return this.server.emit('res', { data });
  }

  @SubscribeMessage('connection')
  handleMessages(@MessageBody() data: any) {
    return this.server.on('connection', (socket) => {
      console.log(`User With ID : ${socket.id} is connected`);

      socket.on('join', (data) => {
        socket.join(data.room);
        console.log(`user ID ${socket.id} join room : ${data.room}`);
      });
    });
  }

  @SubscribeMessage('room')
  handleRoom(@MessageBody() data: any) {
    console.log(data);
    return this.server.emit('resp', { data });
  }
}
