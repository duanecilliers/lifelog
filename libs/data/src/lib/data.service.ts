import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataService extends PrismaClient {
  private defaultAdmin: { email: string; password: string };

  constructor(private readonly config: ConfigService) {
    super();
    this.defaultAdmin = this.config.get('admin');
  }

  public async onModuleDestroy() {
    await this.$disconnect();
  }

  public async onModuleInit() {
    await this.$connect();
    await this.ensureAdminUser();
  }

  public async allUsers() {
    return await this.user.findMany();
  }

  public async findUserByEmail(email: string) {
    return this.user.findFirst({ where: { email } });
  }

  public async ensureAdminUser() {
    const adminUser = await this.findUserByEmail(this.defaultAdmin.email);
    if (adminUser) {
      Logger.log(`Admin user: ${adminUser.email}`, 'DataService');
      return true;
    } else {
      const user = await this.user.create({ data: this.defaultAdmin });
      Logger.log(`Admin user created: ${user.email}`, 'DataService');
    }
  }

  public async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const created = await this.user.create({ data: { email, password } });
      console.log({ created });
      return created;
    } catch (error) {
      console.log('error creating user', error);
    }
  }
}
