import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { Login } from './interfaces/login.interface';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string): Promise<Login> {
    return this.usersService.login(email, password);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
  
  @Get(':id')
  @UseGuards(BasicAuthGuard)
  get(@Param('id') id: string): Promise<User> {
    return this.usersService.get(id);
  }

  @Post()
  // @UseGuards(AdminAuthGuard)
  create(@Body('user') user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @UseGuards(BasicAuthGuard)
  update(@Body('user') user: User): Promise<User> {
    return this.usersService.update(user);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }
}
