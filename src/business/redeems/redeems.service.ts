import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Redeem } from './redeems.entity';

@Injectable()
export class RedeemsService {
  constructor(@InjectRepository(Redeem) private redeemsRepository: Repository<Redeem>) {}

  async getAllByUser(): Promise<Redeem[]> {
    return this.redeemsRepository.find();
  }

  async create(redeem: Redeem): Promise<Redeem> {
    const entity = new Redeem();
    return this.redeemsRepository.save(entity);
  }
}