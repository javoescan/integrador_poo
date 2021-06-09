import { Body, Controller, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { TransformInterceptor } from 'interceptors/transform.interceptor';
import { RedeemCreate } from './interfaces/redeem-create.interface';
import { Redeem } from './redeems.entity';
import { RedeemsService } from './redeems.service';

@Controller('redeems')
export class RedeemsController {
  constructor(private readonly redeemsService: RedeemsService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(TransformInterceptor)
  getAll(@Query('limit') limit, @Query('page') page): Promise<Redeem[]> {
    return this.redeemsService.getAll(limit, page);
  }

  @Get(':id')
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(TransformInterceptor)
  getAllByUser(@Param('id') id, @Query('limit') limit, @Query('page') page): Promise<Redeem[]> {
    return this.redeemsService.getAllByUser(id, limit, page);
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  @UseGuards(BasicAuthGuard)
  create(@Body() redeem: RedeemCreate, @Req() req): Promise<Redeem> {
    return this.redeemsService.create(redeem, req.user);
  }
}
