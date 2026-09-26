import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOneBy({ providerId: id });
    if (!provider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    }
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });
    if (!provider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    }
    return this.providerRepository.save(provider);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);
    return this.providerRepository.remove(provider);
  }
}