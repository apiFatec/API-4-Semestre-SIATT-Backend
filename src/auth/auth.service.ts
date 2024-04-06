import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
}
