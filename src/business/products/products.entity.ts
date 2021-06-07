import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
