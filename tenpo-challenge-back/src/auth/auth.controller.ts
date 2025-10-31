import { envs } from '@/config/envs';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  private readonly REFRESH_TOKEN_COOKIE = 'refreshToken';
  private readonly REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días

  constructor(private readonly authService: AuthService) {}

  private getRefreshTokenCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: envs.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.REFRESH_TOKEN_MAX_AGE,
      path: '/',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.loginUser(loginUserDto);

    // Establecer refresh token en cookie HTTP-only
    response.cookie(
      this.REFRESH_TOKEN_COOKIE,
      result.refreshToken,
      this.getRefreshTokenCookieOptions(),
    );

    // Retornar solo datos seguros (no incluir refresh token en el body)
    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
      accessToken: result.accessToken,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.[this.REFRESH_TOKEN_COOKIE] as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const result = await this.authService.refreshAccessToken(refreshToken);

    response.cookie(
      this.REFRESH_TOKEN_COOKIE,
      result.refreshToken,
      this.getRefreshTokenCookieOptions(),
    );

    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(this.REFRESH_TOKEN_COOKIE, {
      httpOnly: true,
      secure: envs.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return { message: 'Logged out successfully' };
  }
}
