import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DataService } from '@lifelog/data';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/create-profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly dataService: DataService) {}

  /** @todo add another guard for user roles */
  @Query(() => [Profile], { name: 'profiles' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.dataService.allProfiles();
  }

  /** @todo add another guard for user roles */
  @Query(() => Profile, { name: 'profile' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('userId') userId: number) {
    return this.dataService.findProfileByUserId(userId);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  updateProfile(@Args('profile') profile: UpdateProfileInput) {
    return this.dataService.updateProfile(profile);
  }
}
