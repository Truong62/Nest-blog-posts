import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { TokenService } from './token.service';
import { HashingService } from './hashing.service';

@Global()
@Module({
  imports: [JwtModule],
  providers: [PrismaService, HashingService, TokenService],
  exports: [PrismaService, HashingService, TokenService],
})
export class SharedModule {}
