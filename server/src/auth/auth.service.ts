import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    //destructure password seprately so its not present in result.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user['dataValues'];
    return result;
  }

  async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }
  async create(user) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.createUser({
      ...user,
      password: pass,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];
    const token = await this.generateToken(result);
    return {
      user: result,
      token,
    };
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
