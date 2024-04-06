import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result
    }
    return null
  }

  async login(user: any){
    const payload = { sub: user.userId, username: user.username };
    return {  
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
