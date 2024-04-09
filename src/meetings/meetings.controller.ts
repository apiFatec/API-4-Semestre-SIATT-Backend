import { Controller, Post, Body } from '@nestjs/common';
import { MeetingsService } from './meetings.service';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  async scheduleMeeting(@Body() meetingData: any) {
    const { startTime, ...otherMeetingData } = meetingData;
    const startDate = new Date(startTime); 
    const meeting = await this.meetingsService.scheduleMeeting(startDate, otherMeetingData); 
    return meeting;
  }
}
