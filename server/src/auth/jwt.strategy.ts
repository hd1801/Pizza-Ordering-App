import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    //check if user in token actually exists:
    const user = await this.userService.findOneById(payload.user_id);
    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the action.',
      );
    }
    Logger.log(payload);
    return payload;
  }
}
