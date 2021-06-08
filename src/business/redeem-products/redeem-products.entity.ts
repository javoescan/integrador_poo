import { Product } from 'business/products/products.entity';
import { Redeem } from 'business/redeems/redeems.entity';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'redeem_products' })
export class RedeemProduct {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	price: number;

	@ManyToOne(() => Redeem, redeem => redeem.redeemProducts)
	@JoinColumn({ name: 'redeem_id' })
	redeem: Redeem;

	@ManyToOne(() => Product, product => product.redeemProducts)
	@JoinColumn({ name: 'product_id' })
	product: Product;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

	@BeforeInsert()
	async beforeInsert(): Promise<void> {
		this.id = uuid();
	}
}
