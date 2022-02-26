import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { DataService } from '@lifelog/data';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: process.env.NX_JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    DataService,
    ConfigService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
