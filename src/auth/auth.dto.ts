import { IsDate, IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Match } from 'src/shared/decorators/custom-validator.decorator';

export class LoginBodyDTO {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class LoginResponseDTO {
  @IsString()
  accessToken: string;
  @IsString()
  refreshToken: string;

  constructor(data: LoginResponseDTO) {
    Object.assign(this, data);
  }
}

export class RegisterDTO extends LoginBodyDTO {
  @IsString()
  name: string;

  @Match('password', { message: 'password and confirm password must be the same' })
  @IsString()
  confirmPassword: string;
}

export class RegisterResponseDTO {
  @IsNumber() id: number;
  @IsString() email: string;
  @IsString() name: string;
  @IsString()
  @Exclude()
  password: string;
  @IsDate() createdAt: Date;
  @IsDate() updatedAt: Date;

  constructor(data: RegisterResponseDTO) {
    Object.assign(this, data);
  }
}

export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResponseDTO extends LoginResponseDTO {}

export class LogoutBodyDTO extends RefreshTokenBodyDTO {}

export class LogoutResponseDTO {
  @IsString()
  message: string;

  constructor(data: LogoutResponseDTO) {
    Object.assign(this, data);
  }
}
