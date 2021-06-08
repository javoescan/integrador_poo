import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedeemProduct } from './redeem-products.entity';

@Injectable()
export class RedeemProductsService {
  constructor(@InjectRepository(RedeemProduct) private redeemProductsRepository: Repository<RedeemProduct>) {}

  async getAll(): Promise<RedeemProduct[]> {
    return this.redeemProductsRepository.find();
  }

  async create(redeem: RedeemProduct): Promise<RedeemProduct> {
    const entity = new RedeemProduct();
    return this.redeemProductsRepository.save(entity);
  }
}