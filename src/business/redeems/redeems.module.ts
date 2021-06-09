import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'business/products/products.module';
import { RedeemProductsModule } from 'business/redeem-products/redeem-products.module';
import { UsersModule } from 'business/users/users.module';
import { RedeemsController } from './redeems.controller';
import { Redeem } from './redeems.entity';
import { RedeemsService } from './redeems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Redeem]), ProductsModule, UsersModule, RedeemProductsModule],
  controllers: [RedeemsController],
  providers: [RedeemsService],
})
export class RedeemsModule {}