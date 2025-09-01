import { Injectable } from '@nestjs/common';
import envConfig from './shared/config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! v2';
  }
}
