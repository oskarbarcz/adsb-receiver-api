import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

abstract class AbstractGuard implements CanActivate {
  protected constructor(private authToken: string | undefined) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token === undefined) {
      throw new UnauthorizedException();
    }

    console.log(token);

    return this.isTokenValid(token);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    console.log('Extracted token:', type, token);
    return type === 'Bearer' ? token : undefined;
  }

  isTokenValid(token: string): boolean {
    return token === this.authToken;
  }
}

@Injectable()
export class ClientGuard extends AbstractGuard {
  constructor(configService: ConfigService) {
    super(configService.get<string>('CLIENT_TOKEN'));
  }
}

@Injectable()
export class AdminGuard extends AbstractGuard {
  constructor(configService: ConfigService) {
    super(configService.get<string>('ADMIN_TOKEN'));
  }
}
