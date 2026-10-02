import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.userRoles) {
      return false;
    }

    return this.matchRoles(roles, user.userRoles);
  }

  
matchRoles(roles: string[], userRoles: string[]): boolean {
  if (!roles || !userRoles) return false;

  return userRoles.some((userRole) =>
    roles.some((role) => role.toLowerCase() === userRole.toLowerCase())
  );
}
}