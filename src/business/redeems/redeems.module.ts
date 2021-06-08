import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedeemsController } from './redeems.controller';
import { Redeem } from './redeems.entity';
import { RedeemsService } from './redeems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Redeem])],
  controllers: [RedeemsController],
  providers: [RedeemsService],
})
export class RedeemsModule {}