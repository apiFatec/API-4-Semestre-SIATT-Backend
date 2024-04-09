import { Body, Controller, HttpException, Put } from "@nestjs/common";
import { LoginReturn } from "./dto/return.token.dto";
import { TokenService } from "./token.service";
import { RefreshTokenDto } from "./dto/refresh.token.dto";

@Controller('token')
export class TokenController{
    constructor(
        private tokenService: TokenService
    ){}

    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto): Promise<LoginReturn | HttpException> {
      return this.tokenService.refreshToken(data.oldToken);
    }
}