import { Injectable } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class ZoomService {
  private refreshToken: string;
  private readonly clientId = '4wYTcnqGRYSWytTTBOoTYw';
  private readonly clientSecret = 'dCpMIyVAw6g6xa8TJkMqF2DF6lSo7PWl';
  private readonly zoomApiBaseUrl = 'https://api.zoom.us/v2';
  private accessTokenExpirationTime: number

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
      
      this.refreshToken = response.data.refresh_token;
      return response.data.access_token;
    } catch (error) {
      console.error(
        'Erro ao obter o token de acesso:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  isAccessTokenValid(): boolean {
    const currentTime = new Date().getTime();
    return currentTime < this.accessTokenExpirationTime;
  }

  async refreshAccessToken(): Promise<string> {
    const response = await axios.post(
      'https://zoom.us/oauth/token',
      `grant_type=refresh_token&refresh_token=${this.refreshToken}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data.access_token;
  }
}