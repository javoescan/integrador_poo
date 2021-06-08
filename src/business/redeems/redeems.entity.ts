import { RedeemProduct } from 'business/redeem-products/redeem-products.entity';
import { User } from 'business/users/users.entity';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'redeems' })
export class Redeem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamp' })
	date: Date;

	@ManyToOne(() => User, user => user.redeems)
	@JoinColumn({ name: 'user_id' })
  user: User;

	@OneToMany(() => RedeemProduct, redeemProduct => redeemProduct.redeem)
  redeemProducts: RedeemProduct[];

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