import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/dto.room';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  findall() {
    return this.roomService.findall();
  }

  @Post('create/:id')
  createRoom(
    @Param('id') user_1_id: number,
    @Body('user_2_id') user_2_id: number,
    @Body('name') name: string,
  ) {
    return this.roomService.createRoom(user_1_id, user_2_id, name);
  }
}
