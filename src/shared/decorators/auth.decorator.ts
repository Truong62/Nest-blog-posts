import { SetMetadata } from '@nestjs/common';
import { AuthType, ConditionGuard } from '../constants/auth.constants';

const AUTH_KEY = 'auth';

export const Auth = (authTypes: AuthType[], options: { condition: ConditionGuard }) => {
  return SetMetadata(AUTH_KEY, { authTypes, options });
};
