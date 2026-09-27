import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto'; // o CreateAuthDto si nombraste la clase así

export class UpdateUserDto extends PartialType(CreateUserDto) {}