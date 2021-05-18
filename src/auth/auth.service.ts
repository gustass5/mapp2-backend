import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(
		username: string,
		password: string
	): Promise<Omit<User, 'password'>> {
		const user = await this.usersService.getByUsername(username);

		if (user && bcrypt.compareSync(password, user.password)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	login(user: User): { accessToken: string } {
		const payload = {
			username: user.username,
			sub: user.id
		};

		return { accessToken: this.jwtService.sign(payload) };
	}

	async verify(token: string): Promise<User> {
		const decoded = this.jwtService.verify(token, {
			secret: this.configService.get<string>('JWT_TOKEN')
		});

		const user = await this.usersService.getByUsername(decoded.username);

		if (!user) {
			throw new Error('Unable to get the user from decoded token');
		}

		return user;
	}
}
