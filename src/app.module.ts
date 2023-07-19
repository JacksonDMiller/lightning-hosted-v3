import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './auth/google.strategy';
import { UsersService } from './database/users.service';
import { UsersModule } from './database/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'lightninghosted',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, UsersService],
})
export class AppModule {}
