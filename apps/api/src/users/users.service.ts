import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  /** @todo use Postgres with Prisma */
  private readonly users = [
    {
      id: 1,
      username: 'duane',
      password: 'not-secure',
    },
    {
      id: 2,
      username: 'peter',
      password: 'not-secure',
    },
  ];

  create(createUserInput: CreateUserInput) {
    const user = {
      id: this.users.length + 1,
      username: createUserInput.username,
      password: createUserInput.password,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
