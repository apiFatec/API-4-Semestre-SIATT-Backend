import { Injectable } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class ZoomService {
  private readonly zoomApiBaseUrl = 'https://api.zoom.us/v2';

  async createMeeting(topic: string): Promise<any> {
    try {
      const accessToken = await this.getToken();
      console.log('Access Token:', accessToken);
      const response = await axios.post(
        `${this.zoomApiBaseUrl}/users/me/meetings`,
        {
          topic,
          type: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao criar a reunião:', error.response?.data || error.message);
      throw error;
    }
  }

  private async getToken(): Promise<string> {
    try {
      const response = await axios.post('https://zoom.us/oauth/token', 
        `grant_type=client_credentials&client_id=${process.env.ZOOM_CLIENT_ID}&client_secret=${process.env.ZOOM_CLIENT_SECRET}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);

      return accessToken;
    } catch (error) {
      console.error('Erro ao obter o token de acesso:', error.response?.data || error.message);
      throw error;
    }
  }
}
