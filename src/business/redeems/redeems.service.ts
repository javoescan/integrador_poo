import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'business/products/products.service';
import { RedeemProduct } from 'business/redeem-products/redeem-products.entity';
import { RedeemProductsService } from 'business/redeem-products/redeem-products.service';
import { UserRoles } from 'business/users/enums/roles.enum';
import { User } from 'business/users/users.entity';
import { UsersService } from 'business/users/users.service';
import { Repository } from 'typeorm';
import { RedeemCreate } from './interfaces/redeem-create.interface';
import { RedeemsResponse } from './interfaces/redeem-response.interface';
import { Redeem } from './redeems.entity';

@Injectable()
export class RedeemsService {
  constructor(
    @InjectRepository(Redeem) private redeemsRepository: Repository<Redeem>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly redeemProductsService: RedeemProductsService,
  ) {}

  async getAll(limit: number, page: number): Promise<RedeemsResponse> {
    const [redeems, total] = await this.redeemsRepository.findAndCount({
      relations: ['user'],
      take: limit || 10,
      skip: page || 0,
    });
    return {
      total,
      redeems,
    }
  }

  async getAllByUser(userId: string, limit: number, page: number): Promise<Redeem[]> {
    const user = new User();
    user.id = userId;
    return this.redeemsRepository.find({
      where: { user },
      relations: ['user'],
      take: limit || 10,
      skip: page || 0,
    });
  }

  async create(reqRedeem: RedeemCreate, reqUser: User): Promise<Redeem> {
    try {
      // Step 1: Validate user authentication
      if (reqRedeem.userId !== reqUser.id && reqUser.role === UserRoles.CUSTOMER) {
        throw new HttpException('User does not match with provided in credentials', HttpStatus.UNAUTHORIZED);
      }

      let totalPrice = 0;
      const redeemProducts = []
      // Step 2: Validate products
      await Promise.all(reqRedeem.products.map(async reqProduct => {
        const product = await this.productsService.get(reqProduct.id);
        if (!product) {
          throw new HttpException(`Product ${reqProduct.id} not found`, HttpStatus.BAD_REQUEST);
        }
        if (product.stock < 1) {
          throw new HttpException(`Product ${reqProduct.id} doesnt have stock left`, HttpStatus.BAD_REQUEST);
        }
        totalPrice += product.price;
        const redeemProduct = new RedeemProduct();
        redeemProduct.product = product;
        redeemProduct.price = product.price;
        redeemProducts.push(redeemProduct);
      }));

      const user = await this.usersService.get(reqUser.id);
      // Step 3: Validate user credits
      if (user.credits < totalPrice) {
        throw new HttpException('Insufficient credits', HttpStatus.OK);
      }

      const entity = new Redeem();
      entity.user = user;
      entity.date = new Date();
      const redeem = await this.redeemsRepository.save(entity);
      await Promise.all(redeemProducts.map(async redeemProduct => {
        redeemProduct.redeem = redeem;
        const updatedProduct = redeemProduct.product;
        updatedProduct.stock--;
        await this.productsService.update(updatedProduct);
        return this.redeemProductsService.create(redeemProduct);
      }));
      
      user.credits -= totalPrice;
      await this.usersService.update(user);
      return redeem;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}