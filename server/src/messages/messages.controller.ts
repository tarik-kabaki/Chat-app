import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  findall() {
    return this.messageService.findall();
  }

  @Post('create/:id')
  createMsg(
    @Param('id') userId: number,
    @Body('roomId') roomId: number,
    @Body('messages') messages: string,
  ) {
    return this.messageService.createMsg(userId, roomId, messages);
  }
}
