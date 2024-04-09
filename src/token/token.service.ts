import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginReturn } from './dto/return.token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async saveToken(hash: string, username: string): Promise<void> {
    const existToken = await this.tokenRepository.findOne({ where: { username: username } });
    if (existToken) {
      this.tokenRepository.update(existToken.id, { hash: hash, username: username });
    } else {
      const token = this.tokenRepository.create({
        hash: hash,
        username: username
      })

      this.tokenRepository.insert(token);
    }
  }

  async refreshToken(oldToken: string): Promise<LoginReturn | HttpException> {
    const hasToken = await this.tokenRepository.findOne({ where: { hash: oldToken } });
    if (hasToken) {
      const user = await this.userService.findOne(hasToken.username);
      if (user) {
        return this.authService.authenticate(user.email, user.password);
      } else {
        throw new HttpException({
          message: 'User not found',
        }, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException({
        message: 'Invalid token',
      }, HttpStatus.UNAUTHORIZED);
    }
  }
  
  decodeJwt(token: string): Promise<{ email: string }> {
    let decoded;
    try {
      decoded = this.jwtService.verify(token);
    } catch (error) {
      decoded = this.refreshToken(token);
    }
    return decoded;
  }
}