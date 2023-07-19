import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/database/users.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;

    let user = await this.userService.findByExternalId(id);
    if (!user) {
      user = await this.userService.createNewUser({
        firstName: name.givenName,
        lastName: name.familyName,
        externalId: id,
        email: emails[0].value,
        picture: photos[0].value,
      });
    }
    return user;
  }
}
