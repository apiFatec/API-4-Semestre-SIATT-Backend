import { Injectable } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class ZoomService {
  private readonly zoomApiBaseUrl = 'https://api.zoom.us/v2';

  async createMeeting(
    topic: string,
    startDate: string,
    duration: number,
    accessToken: string,
  ): Promise<any> {
    try {
      console.log('Access Token:', accessToken);
      const response = await axios.post(
        `${this.zoomApiBaseUrl}/users/me/meetings`,
        {
          topic,
          start_time: startDate,
          duration,
          type: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Erro ao criar a reunião:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async getAccessToken(code: string): Promise<string> {
    try {
      const requestBody = new URLSearchParams();
      requestBody.append('grant_type', 'authorization_code');
      console.log(code);
      requestBody.append('code', code);
      requestBody.append(
        'redirect_uri',
        'http://localhost:3000/meetings/callback',
      );

      const response = await axios.post(
        'https://zoom.us/oauth/token',
        requestBody.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic NHdZVGNucUdSWVNXeXRUVEJPb1RZdzpkQ3BNSXlWQXc2ZzZ4YThUSmtNcUYyREY2bFNvN1BXbA==`,
          },
        },
      );

      return response.data.access_token;
    } catch (error) {
      console.error(
        'Erro ao obter o token de acesso:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}