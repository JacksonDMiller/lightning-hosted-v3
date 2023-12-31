import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createNewUser({
    externalId,
    firstName,
    lastName,
    email,
  }: Omit<User, 'id'>): Promise<User | null> {
    return this.usersRepository.save({
      externalId,
      firstName,
      lastName,
      email,
    });
  }

  findByExternalId(externalId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ externalId });
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
