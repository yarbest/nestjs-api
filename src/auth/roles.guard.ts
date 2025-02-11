import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './rolesAuth.decorator';
import { JwtPayload } from './dto/jwtPayload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers.authorization;
      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthenticated' });
      }

      const user = this.jwtService.verify<JwtPayload>(token);
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch {
      throw new UnauthorizedException({ message: 'Unauthenticated' });
    }
  }
}
