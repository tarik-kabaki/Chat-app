import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { usersDto } from './dto/users.dto';
import { Users } from './entity/users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findall(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Users> {
    return this.usersService.findOne(id);
  }

  @Post('find')
  async FilteredUsers(@Body('username') username: string) {
    return this.usersService.FilteredUsers(username);
  }

  @Post('create')
  create(@Body() userDto: usersDto): Promise<usersDto> {
    return this.usersService.create(userDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: number): Promise<Users> {
    return this.usersService.remove(id);
  }
}
