import { ArrayNotEmpty, IsArray, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Region } from "../../regions/entities/region.entity";

export class CreateLocationDto {
  @IsOptional()
  @IsNumber()
  locationId?: number;

  @IsString()
  @MaxLength(35)
  locationName: string;

  @IsString()
  @MaxLength(160)
  locationAddress: string;

  @IsArray()
  @ArrayNotEmpty()
  locationLatLng: number[];

  @IsObject()
  @IsOptional()
  region: Region;
}