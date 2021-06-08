import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedeemProduct } from './redeem-products.entity';
import { RedeemProductsService } from './redeem-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([RedeemProduct])],
  providers: [RedeemProductsService],
  exports: [RedeemProductsService],
})
export class RedeemProductsModule {}