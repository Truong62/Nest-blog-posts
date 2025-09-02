import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // @SerializeOptions({ type: RegisterResponseDTO })
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }
}
