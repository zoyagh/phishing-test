import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../common/repositories/';
import { User } from '../../common/schemas/';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async getUserInfo(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

}
