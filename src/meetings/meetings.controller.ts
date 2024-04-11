import { Controller, Post, Body, Get, Query, Redirect } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { ZoomService } from 'src/zoom/zoom.service';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly zoomService: ZoomService) {}

    @Get('authorize')
    @Redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=4wYTcnqGRYSWytTTBOoTYw&redirect_uri=http://localhost:3000/meetings/callback')
    authorize() {
    }

    @Get('callback')
async handleAuthorizationCallback(@Query('code') code: string, @Query('state') state: string) {
  try {
    const params = new URLSearchParams(state);
    const topic = params.get('topic');
    const startDate = params.get('start_date');
    const durationString = params.get('duration');

    const duration = parseInt(durationString);

    const accessToken = await this.zoomService.getAccessToken(code);
    console.log('Access Token:', accessToken);

    const meeting = await this.zoomService.createMeeting(topic, startDate, duration, accessToken);

    return { success: true, meeting };
  } catch (error) {
    console.error('Erro ao obter o token de acesso ou criar a reunião:', error.response?.data || error.message);
    return { success: false, error: 'Erro ao criar a reunião' };
  }
}
  }
   
