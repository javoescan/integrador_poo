import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private authService: AuthService) {}

  async login(email: string, password: string): Promise<string> {
    const existingUser = await this.usersRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email })
      .getOne();
    if (!existingUser) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordValid) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
    return this.authService.generateJwt(existingUser.id, existingUser.email, existingUser.role);
  }
}