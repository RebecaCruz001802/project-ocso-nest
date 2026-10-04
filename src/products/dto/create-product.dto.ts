import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { Provider } from '../../providers/entities/provider.entity';

export class CreateProductDto {
  @IsString()
  @IsUUID('4')
  @IsOptional()
  productId?: string;

  @ApiProperty({
    default: "Papas Sabritas Sal 160g"
  })
  @IsString()
  @MaxLength(40)
  productName: string;

  @ApiProperty({
    default: 42.00
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    default: 80
  })
  @IsInt()
  countSeal: number;

  @ApiProperty({
    required: false
  })
  @IsObject()
  provider: Provider;
}