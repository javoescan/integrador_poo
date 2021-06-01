import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from '../users/enums/roles.enum';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async generateJwt(id: string, email: string, role: UserRoles): Promise<any> {
		return this.jwtService.sign({ user: { id, email, role } });
	}
}
