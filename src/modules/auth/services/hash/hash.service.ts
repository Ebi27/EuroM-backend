import { Injectable } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtPayload } from '../../interfaces/jwt-payload.interface'
import { jwtSecret } from '@/utils/jwt.config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
constructor(
        private JwtService: JwtService,
){}

async hashPassword(password: string) {
		const saltOrRounds = 10
		return await bcrypt.hash(password, saltOrRounds)
	}
	async comparePassword(args: {hash: string; password: string}) {
		return await bcrypt.compare(args.password, args.hash)
	}

	async signToken(payload: JwtPayload): Promise<string> {
		const token = await this.JwtService.signAsync(payload, {
			secret: jwtSecret,
		})
		return token
	}
}
