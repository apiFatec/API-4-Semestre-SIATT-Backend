import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRegisterDTO } from './DTO/user.register.dto';
import { ResultDTO } from 'src/dto/result.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('listar')
  async list(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('cadastrar')
  async register(@Body() data: UserRegisterDTO): Promise<ResultDTO>{
    return this.userService.register(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user
  }
}
