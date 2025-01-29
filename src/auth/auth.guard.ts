import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // when it returns true, the request will be processed
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>(); // type Request is from express

    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthenticated' });
      }

      this.jwtService.verify(token); // if token expires, it throws its own exception, and we catch it below
      return true;
    } catch {
      throw new UnauthorizedException({ message: 'Unauthenticated' });
    }
  }
}
