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

	@OneToMany(() => RedeemProduct, redeemProduct => redeemProduct.redeem, {
		eager: true
	})
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
