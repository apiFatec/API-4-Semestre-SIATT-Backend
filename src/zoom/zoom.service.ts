import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ZoomApiService {
  private readonly baseUrl = 'https://api.zoom.us/v2';
  private instance: AxiosInstance;

  constructor(
    @Inject('API_KEY') apiKey: string,
    @Inject('API_SECRET') apiSecret: string,
  ) {
    const accessToken = this.generateAccessToken(apiKey, apiSecret);
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }

  public async generateAccessToken(apiKey: string, apiSecret: string): Promise<string> {
    const payload = {
      iss: apiKey,
      exp: Date.now() + 3600,
    };

    const token = jwt.sign(payload, apiSecret);
    console.log(token)
    return token;
  }

  public async createMeeting(startTime: Date, meetingDetails: any): Promise<any> {
    try {
      const response = await this.instance.post(
        '/users/me/meetings',
        meetingDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error creating meeting:', error.response?.data || error.message);
      throw error;
    }
  }
}
