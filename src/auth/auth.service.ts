import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { TokenService } from 'src/token/token.service';
import { LoginReturn } from 'src/token/dto/return.token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService
  ) {}
  
  async authenticate(email: string, password: string): Promise<LoginReturn | null> {
    const user = await this.userService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = this.jwtService.sign({ username: user.email, sub: user.id });
      return {
        access_token: token,
        username: user.name,
      };
    } else {
      return null;
    }
  }
}
