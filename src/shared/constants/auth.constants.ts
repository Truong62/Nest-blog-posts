const REQUEST_USER_KEY = 'user';

export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
  ApiKey: 'ApiKey',
} as const;

export { REQUEST_USER_KEY };
export type AuthType = (typeof AuthType)[keyof typeof AuthType];

export const ConditionGuard = {
  And: 'and',
  Or: 'or',
} as const;

export type ConditionGuard = (typeof ConditionGuard)[keyof typeof ConditionGuard];
