import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel) {}
  createUser(user: CreateUserDto) {
    return this.userModel.create({ ...user });
  }
  getUsers() {
    return this.userModel.findAll();
  }
  findOneByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
  findOneById(user_id: number) {
    return this.userModel.findOne({ where: { user_id } });
  }
}
