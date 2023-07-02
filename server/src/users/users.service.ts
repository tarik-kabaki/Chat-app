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

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  findAll() {
    return this.usersRepo.find();
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
    const newUser = await this.usersRepo.create(usersdto);
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
