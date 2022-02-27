import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient, Profile } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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
    return await this.user.findFirst({ where: { email } });
  }

  public async ensureAdminUser() {
    const adminUser = await this.findUserByEmail(this.defaultAdmin.email);
    if (adminUser) {
      Logger.log(`Admin user: ${adminUser.email}`, 'DataService');
      return true;
    } else {
      const { email, password } = this.defaultAdmin;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.user.create({
        data: { email, password: hashedPassword },
      });
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

  public async allProfiles() {
    return await this.profile.findMany();
  }

  public async findProfileByUserId(userId: number) {
    return await this.profile.findFirst({ where: { userId } });
  }

  public async updateProfile(profile: {
    name: string;
    birthDate: string;
    bio: string;
    userId: number;
  }) {
    const { userId, ...updateRest } = profile;
    const _profile = await this.profile.findFirst({ where: { userId } });

    if (!_profile) {
      return await this.profile.create({ data: profile });
    }

    return await this.profile.update({
      where: { userId },
      data: updateRest,
    });
  }
}
