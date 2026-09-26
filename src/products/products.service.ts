import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { provider, ...productDetails } = createProductDto;

    const product = this.productRepository.create({
      ...productDetails,
      provider: provider ? ({ providerId: provider } as any) : undefined,
    });

    return await this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      productId: id,
    });
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return product;
  }

  async findByProvider(id: string) {
    const productsFound = await this.productRepository.find({
      where: {
        provider: {
          providerId: id,
        },
      },
    });
    if (productsFound.length === 0) {
      throw new NotFoundException(`No hay productos para el proveedor ${id}`);
    }
    return productsFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { provider, ...productDetails } = updateProductDto;

    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...productDetails,
      provider: provider ? ({ providerId: provider } as any) : undefined,
    });

    if (!productToUpdate) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return await this.productRepository.save(productToUpdate);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.productRepository.delete({
      productId: id,
    });
    return {
      message: `Objeto con id ${id} eliminado`,
    };
  }
}