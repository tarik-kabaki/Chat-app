import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Next,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { usersDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  findAll() {
    return this.usersRepo.find({
      relations: {
        messages: { room: { user1: true, user2: true } },
      },
    });
  }

  async uploadUserImage(id: number, image: string) {
    const user = await this.usersRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('This user is not exist!');
    }

    return this.usersRepo.save({ ...user, image: image });
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepo.findOne({
      where: { username: username },
    });

    return user;
  }

  async FilteredUsers(username: string) {
    const users = await this.usersRepo.find({
      relations: {
        messages: { room: { user1: true, user2: true } },
      },
    });
    const filterUsers = users.filter((item: any) => item.username !== username);
    return filterUsers;
  }

  async create(usersdto: usersDto) {
    const ExistingUsername = await this.usersRepo.findOne({
      where: { username: usersdto.username },
    });
    const ExistingEmail = await this.usersRepo.findOne({
      where: { email: usersdto.email },
    });
    if (ExistingUsername || ExistingEmail) {
      throw new BadRequestException(
        `This ${ExistingUsername ? 'Username' : 'Email'} is already exist`,
      );
    }
    if (
      usersdto.username.length < 5 ||
      usersdto.password.length < 5 ||
      usersdto.email.length < 8
    ) {
      throw new BadRequestException();
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(usersdto.password, salt);
    const newUser = await this.usersRepo.create({
      ...usersdto,
      password: hash,
    });
    return await this.usersRepo.save(newUser);
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('this user is not exist');
    }
    return this.usersRepo.remove(user);
  }
}
