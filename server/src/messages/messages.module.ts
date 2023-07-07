import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entity/messages.entity';
import { Users } from 'src/users/entity/users.entity';
import { Room } from 'src/room/entity/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, Users, Room])],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
