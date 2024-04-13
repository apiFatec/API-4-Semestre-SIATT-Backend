import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { ZoomService } from 'src/zoom/zoom.service';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly zoomService: ZoomService) {}

  @Get('authorize')
  @Redirect(
    'https://zoom.us/oauth/authorize?response_type=code&client_id=4wYTcnqGRYSWytTTBOoTYw&redirect_uri=http://localhost:3000/meetings/callback',
  )
  async authorize() {}

  @Get('callback')
  async handleAuthorizationCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    try {
      console.log('Code:', code);
      const accessToken = await this.zoomService.getAccessToken(code);
      console.log('Access Token:', accessToken);

        return res.status(200).json({ accessToken });
    } catch (error) {
      console.error(
        'Erro ao obter o token de acesso:',
        error.response?.data || error.message,
      );
      return res.redirect('http://localhost:5173/error');
    }
  }
}