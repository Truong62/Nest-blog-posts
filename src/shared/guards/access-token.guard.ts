import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../token.service';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.split(' ')[1];

    try {
      const decoded = await this.tokenService.verifyAccessToken(accessToken);
      req[REQUEST_USER_KEY] = decoded;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
