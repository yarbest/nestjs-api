import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';

import { AuthDTO } from './dto/authDTO';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/users.model';
import { JwtPayload } from './dto/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDTO: AuthDTO) {
    const user = await this.validateUser(authDTO);
    return this.generateToken(user);
  }

  async register(authDTO: AuthDTO) {
    const existingUser = await this.usersService.getUserByEmail(authDTO.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = hashSync(authDTO.password, 10);
    const createdUser = await this.usersService.createUser({
      ...authDTO,
      password: hashedPassword,
    });
    return this.generateToken(createdUser);
  }

  private generateToken(user: UsersModel) {
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(authDTO: AuthDTO) {
    const existingUser = await this.usersService.getUserByEmail(authDTO.email);
    const isPasswordMatching = existingUser
      ? compareSync(authDTO.password, existingUser.password)
      : false;

    if (!existingUser || !isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    return existingUser;
  }
}
