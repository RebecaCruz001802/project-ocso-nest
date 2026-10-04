import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../../locations/entities/location.entity";

 export class LocationEmployeeDto {
  @ApiProperty()
  locationId: number;

  @ApiPropertyOptional()
  locationName: string;

  @ApiPropertyOptional()
  locationLatLng: number[];

  @ApiPropertyOptional()
  locationAddress: string;
}

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  employeeName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(70)
  employeeLastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  employeeEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  location: LocationEmployeeDto;
}

