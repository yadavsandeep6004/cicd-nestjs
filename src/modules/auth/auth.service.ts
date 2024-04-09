import { BadRequestException, Injectable } from '@nestjs/common';
import { userServices } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class authService {
  constructor(private readonly UserServices: userServices) {}

  async validateUser(email: string, password: string) {
    const user: CreateUserDto | null = await this.UserServices.findByIdOrEmail({
      email,
    });
    if (!user) {
      throw new BadRequestException("Account doesn'exits");
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      throw new BadRequestException('Incorrent Password');
    }
    return user;
  }
}
