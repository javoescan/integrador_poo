import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { TransformInterceptor } from 'interceptors/transform.interceptor';
import { RedeemCreate } from './interfaces/redeem-create.interface';
import { Redeem } from './redeems.entity';
import { RedeemsService } from './redeems.service';

@Controller('redeems')
export class RedeemsController {
  constructor(private readonly redeemsService: RedeemsService) {}

  @Get()
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(TransformInterceptor)
  getAllByUser(): Promise<Redeem[]> {
    return this.redeemsService.getAllByUser();
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  @UseGuards(BasicAuthGuard)
  create(@Body() redeem: RedeemCreate, @Req() req): Promise<Redeem> {
    return this.redeemsService.create(redeem, req.user);
  }
}
