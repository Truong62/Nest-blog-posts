import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO, LoginResponseDTO, RefreshTokenBodyDTO, RefreshTokenResponseDTO, RegisterDTO } from './auth.dto';

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
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    return new RefreshTokenResponseDTO(await this.authService.refreshToken(body));
  }
}
