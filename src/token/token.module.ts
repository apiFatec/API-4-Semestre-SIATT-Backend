import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { UserModule } from 'src/users/user.module';
import { Token } from './token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]), 
  forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [TokenController],
  providers: [
    TokenService,
  ],
  exports: [TokenService]
})
export class TokenModule {}