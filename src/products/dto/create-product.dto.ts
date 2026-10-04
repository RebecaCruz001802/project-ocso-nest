import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { Provider } from '../../providers/entities/provider.entity'; // Ajusta la ruta a tu entidad Provider

export class CreateProductDto {
  @IsString()
  @IsUUID('4')
  @IsOptional()
  productId?: string;

  @IsString()
  @MaxLength(40)
  productName: string;

  @IsNumber()
  price: number;

  @IsInt()
  countSeal: number;

  @IsObject()
  provider: Provider;
}