import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserCreateInput } from '../@generated/prisma-nestjs-graphql/user/user-create.input';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: UserCreateInput,
    @Context() context
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse)
  signup(@Args('loginUserInput') loginUserInput: UserCreateInput) {
    return this.authService.signup(loginUserInput);
  }
}
