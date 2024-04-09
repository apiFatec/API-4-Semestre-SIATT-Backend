import { Controller, Post, Body } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { ZoomService } from 'src/zoom/zoom.service';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly zoomService: ZoomService) {}

  @Post('create-meeting')
  async createMeeting(@Body() body: { topic: string }) {
    try {
      const meeting = await this.zoomService.createMeeting(body.topic);
      return { success: true, meeting };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
