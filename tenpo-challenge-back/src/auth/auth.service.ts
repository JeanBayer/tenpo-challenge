import { envs } from '@/config/envs';
import {
  ConflictException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaClient } from 'generated/prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, JwtPayloadWithMetadata } from './interfaces';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.user.findUnique({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) throw new ConflictException('Email/Password invalid');

    const isPasswordEqual = compareSync(loginUserDto.password, user.password);

    if (!isPasswordEqual) throw new ConflictException('User/Password invalid');

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      user,
      accessToken: await this.signJWT({ ...payload, type: 'access' }, '15m'),
      refreshToken: await this.signJWT({ ...payload, type: 'refresh' }, '7d'),
    };
  }

  logoutUser() {
    return true;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      const user = await this.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      // Generar nuevo access token Y nuevo refresh token (rotación de tokens)
      return {
        accessToken: await this.signJWT(
          { ...newPayload, type: 'access' },
          '15m',
        ),
        refreshToken: await this.signJWT(
          { ...newPayload, type: 'refresh' },
          '7d',
        ),
      };
    } catch (error) {
      // Loguear el error para debugging pero no exponerlo al cliente
      console.error('Refresh token error:', error);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async signJWT(payload: JwtPayload, expiresIn: string | number = '15m') {
    // @ts-expect-error - expiresIn accepts string or number
    return this.jwtService.signAsync(payload, { expiresIn });
  }

  verifyToken(token: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sub, iat, exp, ...user } =
        this.jwtService.verify<JwtPayloadWithMetadata>(token, {
          secret: envs.JWT_SECRET,
        });

      return {
        user,
        token,
      };
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('invalid token');
    }
  }
}
