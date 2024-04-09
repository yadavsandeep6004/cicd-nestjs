import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userServices } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';

@Module({
  imports:[    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
],
  controllers: [UserController],
  providers: [userServices],
  exports:[userServices]
})
export class UserModule {}
