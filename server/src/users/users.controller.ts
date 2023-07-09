import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { usersDto } from './dto/users.dto';
import { Users } from './entity/users.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Get('upload/:image')
  imagesRoot(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploadsImages' });
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

  @Patch('create/image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadsImages',
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
  createImage(
    @Param('id') id: number,
    @UploadedFile('file') image: Express.Multer.File,
  ) {
    return this.usersService.uploadUserImage(id, image.filename);
  }
}
