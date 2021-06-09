import { RedeemProduct } from 'business/redeem-products/redeem-products.entity';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'products' })
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	price: number;

	@Column()
	stock: number;

	@OneToMany(() => RedeemProduct, redeemProduct => redeemProduct.product)
  redeemProducts: RedeemProduct[];

	@CreateDateColumn({ type: 'timestamp', name: 'created_at', select: false })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', select: false })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', select: false })
  deletedAt?: Date;

	@BeforeInsert()
	async beforeInsert(): Promise<void> {
		this.id = uuid();
	}
}
