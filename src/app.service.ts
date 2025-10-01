import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    let count = 0;
    [21, 8, 2, 5, 13, 3, 3, 34, 21, 3, 8, 2, 2, 5, 13, 3].map((i) => {
      count += i;
    });
    console.log(count);
    return 'Hello World! v2 : ' + count;
  }
}
