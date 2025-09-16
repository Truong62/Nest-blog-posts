import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { HashingService } from 'src/shared/hashing.service';
import { PrismaService } from 'src/shared/prisma.service';
import { createUserType } from 'src/types/auth';
import { LoginBodyDTO, RefreshTokenBodyDTO, RegisterResponseDTO } from './auth.dto';
import { TokenService } from 'src/shared/token.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private hashingService: HashingService,
    private tokenService: TokenService,
  ) {}

  async register(body: createUserType) {
    try {
      const hashedPassword = await this.hashingService.hashPassword(body.password);

      return new RegisterResponseDTO(
        await this.prismaService.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: hashedPassword,
          },
        }),
      );
    } catch (error) {
      console.log(error);
      throw new Error('Failed to register user', error);
    }
  }

  async login(body: LoginBodyDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      throw new UnauthorizedException('account not found');
    }

    const isPasswordMatch = await this.hashingService.comparePassword(body.password, user.password);

    if (!isPasswordMatch) {
      throw new UnprocessableEntityException({
        filed: 'password',
        error: 'password is incorrect',
      });
    }

    const token = await this.generateTokens({ userId: user.id });

    return token;
  }

  async generateTokens(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload),
      this.tokenService.signRefreshToken(payload),
    ]);

    const decodeRefToken = await this.tokenService.verifyRefreshToken(refreshToken);

    await this.prismaService.refetchToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt: new Date(decodeRefToken.exp * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(body: RefreshTokenBodyDTO) {
    try {
      const token = await this.tokenService.verifyRefreshToken(body.refreshToken);

      const existingToken = await this.prismaService.refetchToken.findUnique({
        where: {
          token: body.refreshToken,
        },
      });

      if (!existingToken) {
        throw new UnprocessableEntityException({
          field: 'refreshToken',
          error: 'Refresh token not found or already expired',
        });
      }

      await this.prismaService.refetchToken.delete({
        where: {
          token: body.refreshToken,
        },
      });

      return this.generateTokens({ userId: token.userId });
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException({
        filed: 'refreshToken',
        error: error.message,
      });
    }
  }

  async logout(body: RefreshTokenBodyDTO) {
    try {
      const [decodeRefreshToken, existingToken] = await Promise.all([
        this.tokenService.verifyRefreshToken(body.refreshToken),
        this.prismaService.refetchToken.findUnique({
          where: {
            token: body.refreshToken,
          },
        }),
      ]);

      console.log(existingToken);
      console.log(decodeRefreshToken);

      if (!existingToken) {
        throw new UnprocessableEntityException({
          field: 'refreshToken',
          error: 'Refresh token not found or already expired',
        });
      }

      await this.prismaService.refetchToken.delete({
        where: {
          token: body.refreshToken,
        },
      });

      return { message: 'Logout successful' };
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException({
        filed: 'refreshToken',
        error: error.message,
      });
    }
  }

  async logoutAll(userId: number) {
    await this.prismaService.refetchToken.deleteMany({
      where: { userId },
    });
  }
}
