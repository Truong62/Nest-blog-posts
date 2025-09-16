import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

export const ActiveUser = createParamDecorator((field, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request[REQUEST_USER_KEY];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return field ? user?.[field] : user;
});
