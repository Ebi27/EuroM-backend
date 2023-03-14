import { Injectable } from '@nestjs/common'
import {PrismaService} from '../../../prisma/services/prisma.service'
import { SignupDto } from '../../modules/auth/dtos/signup.dto'
import { AuthService } from '../.././modules/auth/services/auth.service'

@Injectable()
export class SignupRepository {
	constructor(
        private prisma: PrismaService, 
        private authService: AuthService
        ) 
        {}

    async signup(dto: SignupDto) {
		try {
			const {email, password, confirmPassword} = dto
			const foundUser = await this.prisma.user.findUnique({
				where: {
					email,
				},
			})

			if (foundUser) {
				throw new Error('User already exists')
			}
			const hashedPassword = await this.authService.hashPassword(password)
			if (password !== confirmPassword) {
				throw new Error('Passwords do not match')
			}
			const newUser = await this.prisma.user.create({
				data: {
					email,
					password: hashedPassword,
				},
			})
			return newUser
		} catch (error) {
			console.error(`Error in signup: ${error.message}`)
			throw new Error('Signup failed')
		}
	}
}
