import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashingService {
  hashPassword(password: string) {
    return hash(password, 10);
  }

  comparePassword(password: string, hash: string) {
    return compare(password, hash);
  }
}
