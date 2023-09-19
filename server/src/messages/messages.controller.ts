import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  findall() {
    return this.messageService.findall();
  }

  @Get('getChatImage/:image')
  getChatImage(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './chatImages' });
  }

  @Delete('deleteImage/:image')
  deleteChatImage(@Param('image') image: string) {
    return fs.unlink('./chatImages/' + image, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${image} : Delete File successfully.`);
    });
  }

  @Post('create/:id')
  createMsg(
    @Param('id') userId: number,
    @Body('roomId') roomId: number,
    @Body('messages') messages: string,
    @Body('type') type: string,
  ) {
    return this.messageService.createMsg(userId, roomId, messages, type);
  }

  @Post('getmany/:roomId')
  findMessagesByRoomId(@Param('roomId') roomId: number) {
    return this.messageService.findMessagesByRoomId(roomId);
  }

  @Delete('removeMsg/:id')
  removeMsg(@Param('id') id: number) {
    return this.messageService.removeMsg(id);
  }

  @Post('messages/image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './chatImages',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtention = file.originalname.split('.')[1];
          const newFileName =
            name.split('').join('_') + '_' + Date.now() + '.' + fileExtention;
          cb(null, newFileName);
        },
      }),
    }),
  )
  createChatImage(
    @Param('id') userId: number,
    @Body('roomId') roomId: number,
    @UploadedFile('file') messages: Express.Multer.File,
    @Body('type') type: string,
  ) {
    return this.messageService.uploadChatImage(
      userId,
      roomId,
      messages.filename,
      type,
    );
  }
}
