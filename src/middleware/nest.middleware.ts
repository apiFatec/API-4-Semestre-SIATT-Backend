import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ZoomService } from 'src/zoom/zoom.service';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: ZoomService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.authService.isAccessTokenValid()) {
      try {
        const newAccessToken = await this.authService.refreshAccessToken();
        req.headers.authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error('Falha ao renovar o accessToken:', error);
      }
    }
    next();
  }
}
