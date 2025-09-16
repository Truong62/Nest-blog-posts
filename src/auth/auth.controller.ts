import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginBodyDTO,
  LoginResponseDTO,
  LogoutResponseDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResponseDTO,
  RegisterDTO,
} from './auth.dto';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // @SerializeOptions({ type: RegisterResponseDTO })
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    return new LoginResponseDTO(await this.authService.login(body));
  }

  @Post('refresh-token')
  @UseGuards(AccessTokenGuard)
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    return new RefreshTokenResponseDTO(await this.authService.refreshToken(body));
  }

  @Post('logout')
  async logout(@Body() body: RefreshTokenBodyDTO): Promise<LogoutResponseDTO> {
    return new LogoutResponseDTO(await this.authService.logout(body));
  }

  // @Post('logout-all')
  // @UseGuards(AccessTokenGuard)
  // async logoutAll(@Body() body: RefreshTokenBodyDTO) {
  //   await this.authService.logoutAll(body.refreshToken);
  //   return { message: 'Logout all successful' };
  // }
}
