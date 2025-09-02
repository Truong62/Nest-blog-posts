import { IsDate, IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class LoginBodyDTO {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class RegisterDTO extends LoginBodyDTO {
  @IsString()
  name: string;
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
