import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controler';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/helpers/multer.config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  MulterModule.register(multerConfig), forwardRef(() => AuthModule), TokenModule],
  controllers:[UserController],
  providers: [
    UserService
],
  exports: [UserService]
})
export class UserModule {}