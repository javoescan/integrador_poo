import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string): Promise<string> {
    return this.usersService.login(email, password);
  }
}