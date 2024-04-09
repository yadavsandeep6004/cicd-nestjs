import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class userServices {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async findByIdOrEmail(filter: { _id?: string; email?: string }) {
    return this.userModel.findOne(filter);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByIdOrEmail({email:createUserDto.email})
    if(user){
        throw new BadRequestException("Account already exists!")
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password,10)
    return await new this.userModel(createUserDto).save();
  }

  async getUsers() {
    return await this.userModel.find({});
  }
}
