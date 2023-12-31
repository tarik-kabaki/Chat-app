import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

let OnlineUsers = [];

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

      socket.on('newUser', (data) => {
        OnlineUsers.push({ ...data, socketId: socket.id });
        console.log(OnlineUsers);
      });

      socket.on('joinRoom', (data) => {
        socket.join(data);
        console.log(`User with ID ${socket.id} join room : ${data}`);
      });

      socket.on('handlingUsersRooms', (data) => {
        socket.broadcast.emit('ReshandlingUsersRooms', data);
      });

      socket.on('sendMessage', (data) => {
        socket.to(data.room.name).emit('responeData', data);
      });

      socket.on('messageRemoveRequest', (data) => {
        socket.to(data.room.name).emit('resMessageRemoveRequest', data);
      });

      socket.on('disconnect', () => {
        console.log(`User with ID ${socket.id} has been disconnect`);
        OnlineUsers.splice(
          OnlineUsers.findIndex((item) => item.userId === socket.id),
          1,
        );
        console.log(OnlineUsers);
      });

      // Calling sections //

      socket.on('audioCall', (data) => {
        socket
          .to(
            OnlineUsers?.find((item) => item?.userId === data?.receiver?.id)
              ?.socketId,
          )
          .emit('callReceiver', data);
      });
    });
  }
}
