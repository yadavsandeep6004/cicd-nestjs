import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { userServices } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../decorators/public';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly UserServices: userServices,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    const payload = { email: req.user.email, name: req.user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @Public()
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.UserServices.create(createUserDto);
  }
}
