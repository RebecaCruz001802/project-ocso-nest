import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ROLES } from "../constants/roles.constants";
import { Roles } from "./roles.decorator"; 

export const Auth = (...roles: ROLES[]) => {
  return applyDecorators(
    Roles([...roles, ROLES.ADMIN]),
    UseGuards(AuthGuard, RolesGuard)
  );
};