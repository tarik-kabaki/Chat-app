import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entity/room.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';
import { RoomDto } from './dto/dto.room';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
  ) {}

  findall() {
    return this.roomRepo.find({
      relations: {
        messages: { users: true },
        user1: true,
        user2: true,
      },
    });
  }

  async createRoom(user_1_id: number, user_2_id: number, name: string) {
    const user_1 = await this.usersRepo.findOne({
      where: { id: user_1_id },
    });

    if (!user_1) {
      throw new NotFoundException('This user is not found!');
    }

    await this.usersRepo.save(user_1);

    const user_2 = await this.usersRepo.findOne({
      where: { id: user_2_id },
    });

    if (!user_2) {
      throw new NotFoundException('This user is not found!');
    }

    await this.usersRepo.save(user_2);

    if (name.length < 1) {
      throw new BadRequestException();
    }

    /* const findExistingRoom = await this.roomRepo
      .createQueryBuilder('test')
      .where('user_1 = :id', { id: user_1.id })
      .andWhere('user_2 = :user_2_id', { user_2_id: user_2.id })
      .getOne();*/

    const findExistingRoom = await this.roomRepo.findOne({
      where: { name: `${user_1.id + user_2.id}` },
    });

    if (findExistingRoom) {
      const getingExistingRoom = this.roomRepo.findOne({
        relations: {
          user1: true,
          user2: true,
          messages: { users: true },
        },
        where: { id: findExistingRoom.id },
      });
      return getingExistingRoom;
    }

    const ExistingName = await this.roomRepo.findOne({
      where: { name: name },
    });

    if (ExistingName) {
      throw new BadRequestException('This room is already exist!');
    }

    const RoomName = user_1.id + user_2.id;

    const room = await this.roomRepo.create({ name: `${RoomName}` });

    room.user1 = user_1;
    room.user2 = user_2;

    await this.roomRepo.save(room);

    const createdRoom = await this.roomRepo.findOne({
      where: { id: room.id },
      relations: {
        user1: true,
        user2: true,
        messages: { users: true },
      },
    });

    return createdRoom;
  }
}
