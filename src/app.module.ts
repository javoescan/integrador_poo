import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db/typeorm.config.service';
import { UsersModule } from './business/users/users.module';
import { AuthModule } from 'business/auth/auth.module';
import { ProductsModule } from 'business/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
