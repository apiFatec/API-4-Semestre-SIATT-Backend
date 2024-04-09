import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRegisterDTO } from './DTO/user.register.dto';
import { ResultDTO } from 'src/dto/result.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuario')
export class UserController {
  constructor(private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async list(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('cadastrar')
  async register(@Body() data: UserRegisterDTO): Promise<ResultDTO>{
    return this.userService.register(data);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log("User:", req.user);
    const { email, password } = req.body;
    if (email && password) {
      const authenticationResult = await this.authService.authenticate(email, password);
      if (authenticationResult) {
        return authenticationResult;
      } else {
        throw new HttpException({
          message: "Invalid credentials.",
        }, HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException({
        message: "Email and password are required.",
      }, HttpStatus.BAD_REQUEST);
    }
  }}
