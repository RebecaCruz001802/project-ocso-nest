import { IsEmail, IsIn, IsOptional, IsString, MinLength, IsArray} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(8)
  userPassword: string;

  @IsOptional()
  @IsArray()
  @IsIn(["Admin", "Employee", "Manager"], { each: true })
  userRoles: string[];
}