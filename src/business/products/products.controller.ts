import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { TransformInterceptor } from 'interceptors/transform.interceptor';
import { ProductsResponse } from './interfaces/products-response.interface';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  @UseGuards(BasicAuthGuard)
  getAll(@Query('limit') limit, @Query('page') page): Promise<ProductsResponse> {
    return this.productsService.getAll(limit, page);
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  @UseGuards(BasicAuthGuard)
  get(@Param('id') id: string): Promise<Product> {
    return this.productsService.get(id);
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  @UseGuards(AdminAuthGuard)
  create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseInterceptors(TransformInterceptor)
  @UseGuards(AdminAuthGuard)
  update(@Body() product: Product): Promise<Product> {
    return this.productsService.update(product);
  }

  @Delete(':id')
  @UseInterceptors(TransformInterceptor)
  @UseGuards(AdminAuthGuard)
  delete(@Param('id') id: string): Promise<string> {
    return this.productsService.delete(id);
  }
}
