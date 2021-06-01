import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRoles } from './enums/roles.enum';

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
}