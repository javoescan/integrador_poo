import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { Redeem } from './redeems.entity';
import { RedeemsService } from './redeems.service';

@Controller('redeems')
export class RedeemsController {
  constructor(private readonly redeemsService: RedeemsService) {}

  @Get()
  @UseGuards(BasicAuthGuard)
  getAllByUser(): Promise<Redeem[]> {
    return this.redeemsService.getAllByUser();
  }

  @Post()
  @UseGuards(BasicAuthGuard)
  create(@Body() redeem: Redeem): Promise<Redeem> {
    return this.redeemsService.create(redeem);
  }
}
