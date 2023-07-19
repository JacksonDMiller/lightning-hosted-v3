import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './database/users.service';

@Injectable()
export class AppService {
  @Inject(UsersService)
  private readonly userService: UsersService;
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
