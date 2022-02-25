import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.NX_JWT_SECRET,
      // logging: true,
    });
  }

  async validate(payload: any) {
    /** @todo decode JWT */
    return { userId: payload.sub, username: payload.username };
  }
}
