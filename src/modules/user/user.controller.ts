import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { userServices } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guards';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: userServices) {}

  @Get()
  //  @UseGuards(JwtAuthGuard)
  async get() {
    return await this.userServices.getUsers();
  }

  @Get('cicd')
  async welcome() {
    return 'Welcome to cicd pipeline !';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file, '======');
  }
}
