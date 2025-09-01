import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HashingService } from './hashing.service';

@Global()
@Module({
  providers: [PrismaService, HashingService],
  exports: [PrismaService, HashingService],
})
export class SharedModule {}
