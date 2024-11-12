import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../../common/repositories/';
import { IJwtPayload } from '../../common/config/app.config';
import { UserDto } from '../users/dtos';
import { RegistrationDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async registration(
    registrationDto: RegistrationDto,
  ): Promise<{ message: string; status: number }> {
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);

    const newUser = await this.userRepository.create({
      email: registrationDto.email,
      password: hashedPassword,
      fullName: registrationDto.fullName,
    });

    return { status: 201, message: 'User registered successfully' };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; data: UserDto }> {
    const user = await this.userRepository.findByEmail(email); 
    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const payload: IJwtPayload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      data: new UserDto(user),
    };
  }
}
