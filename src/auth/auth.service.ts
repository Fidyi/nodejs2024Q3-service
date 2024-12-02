import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(signupDto: SignupDto) {
    const { login, password } = signupDto;
    const existingUser = await this.userService.findByLogin(login);
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }
    await this.userService.create({ login, password });
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.userService.findByLogin(login);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
