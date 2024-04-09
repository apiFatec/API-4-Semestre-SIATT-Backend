import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TokenModule } from 'src/token/token.module';
import { ZoomApiService } from 'src/zoom/zoom.service';
require('dotenv').config();

console.log(process.env.JWT_TOKEN)

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService]
})

export class AuthModule {}
