import { Injectable } from '@nestjs/common';
import { HashingService } from 'src/shared/hashing.service';
import { PrismaService } from 'src/shared/prisma.service';
import { createUserType } from 'src/types/auth';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private hashingService: HashingService,
  ) {}

  async register(body: createUserType) {
    try {
      const hashedPassword = await this.hashingService.hashPassword(body.password);

      return this.prismaService.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to register user', error);
    }
  }
}
