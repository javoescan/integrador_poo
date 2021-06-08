import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'business/products/products.service';
import { UserRoles } from 'business/users/enums/roles.enum';
import { User } from 'business/users/users.entity';
import { UsersService } from 'business/users/users.service';
import { Repository } from 'typeorm';
import { RedeemCreate } from './interfaces/redeem-create.interface';
import { Redeem } from './redeems.entity';

@Injectable()
export class RedeemsService {
  constructor(
    @InjectRepository(Redeem) private redeemsRepository: Repository<Redeem>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async getAllByUser(): Promise<Redeem[]> {
    return this.redeemsRepository.find();
  }

  async create(redeem: RedeemCreate, reqUser: User): Promise<Redeem> {
    try {
      if (redeem.userId !== reqUser.id && reqUser.role === UserRoles.CUSTOMER) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }
      let totalPrice = 0;
      await Promise.all(redeem.products.map(async reqProduct => {
        try {
          const product = await this.productsService.get(reqProduct.id);
          totalPrice += product.price;
        } catch (e) {
          throw new HttpException(`Product ${reqProduct.id} not found`, HttpStatus.BAD_REQUEST);
        }
      }));
      const user = await this.usersService.get(reqUser.id);
      if (user.credits < totalPrice) {
        throw new HttpException('Insufficient credits', HttpStatus.OK);
      }

      // @TBD
      //  - Create redeem products
      //  - Substract credits to user
      //  - Update stock
      const entity = new Redeem();
      return this.redeemsRepository.save(entity);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}