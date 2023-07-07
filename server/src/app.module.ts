import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/entity/users.entity';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';
import { RoomModule } from './room/room.module';
import { Room } from './room/entity/room.entity';
import { Messages } from './messages/entity/messages.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0644758842kkk',
      database: 'realchat',
      entities: [Users, Room, Messages],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EventsModule,
    MessagesModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
