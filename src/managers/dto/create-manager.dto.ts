import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../../locations/entities/location.entity";

export class CreateManagerDto {
  @ApiProperty({
    default: "Yoselin Cruz Martínez"
  })
  @IsString()
  @MaxLength(80)
  managerFullName: string;

  @ApiProperty({
    default: "yoselin.cruz@ocso.com"
  })
  @IsString()
  @IsEmail()
  managerEmail: string;

  @ApiProperty({
    default: 18500.50
  })
  @IsNumber()
  managerSalary: number;

  @ApiProperty({
    default: "4429876543"
  })
  @IsString()
  @MaxLength(16)
  managerPhoneNumber: string;

  @ApiProperty({
    required: false
  })
  @IsObject()
  @IsOptional()
  location: Location;
}