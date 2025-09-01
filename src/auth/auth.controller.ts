import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { createUserType } from 'src/types/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: createUserType) {
    return this.authService.register(body);
  }
}
