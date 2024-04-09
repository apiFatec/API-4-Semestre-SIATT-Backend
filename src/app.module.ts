import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TokenModule } from './token/token.module';
import { MeetingsController } from './meetings/meetings.controller';
import { MeetingsService } from './meetings/meetings.service';
import { ZoomApiService } from './zoom/zoom.service';
require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.TYPEORM_CONNECTION,
    port: Number(process.env.TYPEORM_PORT),
    host: process.env.TYPEORM_HOST,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  } as TypeOrmModuleOptions),
  UserModule,
  TokenModule,
],
  controllers: [MeetingsController],
  providers: [MeetingsService, ZoomApiService, {
    provide: 'API_KEY', 
    useValue: '1uX2ISuaTxGA6e3uh0p7JQ', 
  },
  {
    provide: 'API_SECRET',
    useValue: '3z042sJwSzyiaDjWELbGbQ', 
  }],
})
export class AppModule {}
