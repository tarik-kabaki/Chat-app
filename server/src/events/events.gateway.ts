import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`User with ID ${socket.id} is connected`);

      socket.on('joinRoom', (data) => {
        socket.join(data);
        console.log(`User with ID ${socket.id} join room : ${data}`);
      });

      socket.on('sendMessage', (data) => {
        socket.to(data.room.name).emit('responeData', data);
      });

      socket.on('messageRemoveRequest', (data) => {
        socket.to(data.room.name).emit('resMessageRemoveRequest', data);
      });

      socket.on('disconnect', () => {
        console.log(`User with ID ${socket.id} has been disconnect`);
      });
    });
  }
}
