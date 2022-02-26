import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataService } from '@lifelog/data';
import { User } from '../users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dataService: DataService
  ) {}

  async validateUser(email: string, password: string) {
    console.log({ email });
    const user = await this.dataService.user.findUnique({ where: { email } });
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(
        {
          email: user.email,
          sub: user.id,
        },
        { expiresIn: '10h' }
      ),
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = await this.dataService.findUserByEmail(loginUserInput.email);
    if (user) {
      throw new BadRequestException(
        { message: 'User already exists!' },
        'User already exists.'
      );
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);
    const createdUser = await this.dataService.createUser({
      ...loginUserInput,
      password,
    });

    return {
      access_token: this.jwtService.sign(
        {
          email: createdUser.email,
          sub: createdUser.id,
        },
        { expiresIn: '10h' }
      ),
      user: createdUser,
    };
  }
}
