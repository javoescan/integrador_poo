import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(BasicAuthGuard)
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  @UseGuards(BasicAuthGuard)
  get(@Param('id') id: string): Promise<Product> {
    return this.productsService.get(id);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body('product') product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  update(@Body('product') product: Product): Promise<Product> {
    return this.productsService.update(product);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  delete(@Param('id') id: string): Promise<string> {
    return this.productsService.delete(id);
  }
}
