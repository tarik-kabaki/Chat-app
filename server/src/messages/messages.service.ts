import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entity/messages.entity';
import { Repository } from 'typeorm';
import { MsgDto } from './dto/messages.dto';
import { Users } from 'src/users/entity/users.entity';
import { Room } from 'src/room/entity/room.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages) private messagesRepo: Repository<Messages>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
  ) {}

  findall() {
    return this.messagesRepo.find();
  }

  async findMessagesByRoomId(roomId: number) {
    const messages = await this.messagesRepo
      .createQueryBuilder('messages')
      .select()
      .where('messages.roomId = :roomId', { roomId })

      .getMany();
    return messages;
  }

  async createMsg(userId: number, roomId: number, messages: string) {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
    });

    await this.usersRepo.save(user);

    const room = await this.roomRepo.findOne({
      where: { id: roomId },
    });

    await this.roomRepo.save(room);

    if (messages.length < 1) {
      throw new BadRequestException("can't send an empty message");
    }

    const message = await this.messagesRepo.create({ message: messages });

    message.users = user;
    message.room = room;

    return await this.messagesRepo.save(message);
  }

  async removeMsg(id: number) {
    const message = await this.messagesRepo.findOne({
      where: { id: id },
    });

    if (!message) {
      throw new NotFoundException();
    }

    return this.messagesRepo.remove(message);
  }
}
