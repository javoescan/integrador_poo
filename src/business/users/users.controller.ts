import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { TransformInterceptor } from 'interceptors/transform.interceptor';
import { Login } from './interfaces/login.interface';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @UseInterceptors(TransformInterceptor)
  login(@Body('email') email: string, @Body('password') password: string): Promise<Login> {
    return this.usersService.login(email, password);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  @UseGuards(AdminAuthGuard)
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
  
  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  @UseGuards(BasicAuthGuard)
  get(@Param('id') id: string): Promise<User> {
    return this.usersService.get(id);
  }

  @Post()
  @UseInterceptors(TransformInterceptor)
  @UseGuards(AdminAuthGuard)
  create(@Body('user') user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @UseInterceptors(TransformInterceptor)
  @UseGuards(BasicAuthGuard)
  update(@Body('user') user: User): Promise<User> {
    return this.usersService.update(user);
  }

  @Delete(':id')
  @UseInterceptors(TransformInterceptor)
  @UseGuards(AdminAuthGuard)
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }
}
