import { Injectable } from '@nestjs/common';
import { ZoomApiService } from 'src/zoom/zoom.service';

@Injectable()
export class MeetingsService {
  constructor(private readonly zoomApiService: ZoomApiService) {}

  async scheduleMeeting(startTime: Date, meetingData: any) {
    const meeting = await this.zoomApiService.createMeeting(startTime, meetingData); 
    console.log(meeting);
    return meeting;
  }
}
