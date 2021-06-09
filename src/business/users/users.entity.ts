import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRoles } from './enums/roles.enum';
import { v4 as uuid } from 'uuid';
import { Redeem } from 'business/redeems/redeems.entity';

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

	@Column()
	credits: number;

	@Column({
		type: 'enum',
		enum: UserRoles,
		default: UserRoles.CUSTOMER,
	})
	role: UserRoles;

	@OneToMany(() => Redeem, redeem => redeem.user)
  redeems: Redeem[];

	@CreateDateColumn({ type: 'timestamp', name: 'created_at', select: false })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', select: false })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', select: false })
  deletedAt?: Date;

	@BeforeInsert()
	async beforeInsert(): Promise<void> {
		this.id = uuid();
		this.password = await bcrypt.hash(this.password, 10);
	}
}
