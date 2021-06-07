import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRoles } from './enums/roles.enum';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'first_name' })
	firstName: string;

	@Column({ name: 'last_name' })
	lastName: string;

	@Column('varchar', { length: 100 })
	email: string;

	@Column()
	document: string;

	@Column({ select: false })
	password: string;

	@Column({
		type: 'enum',
		enum: UserRoles,
		default: UserRoles.CUSTOMER,
	})
	role: UserRoles;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

	@BeforeInsert()
	async beforeInsert(): Promise<void> {
		this.id = uuid();
		this.password = await bcrypt.hash(this.password, 10);
	}
}
