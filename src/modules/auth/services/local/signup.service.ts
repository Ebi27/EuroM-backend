import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../../prisma/services/prisma.service'
import { SignupDto } from '../../dtos/signup.dto'
import { HashService } from '../hash/hash.service'

@Injectable()
export class SignupService {
	constructor(
        private prisma: PrismaService, 
        private hash: HashService,
		private dto: SignupDto
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
			const hashedPassword = await this.hash.hashPassword(password)
			if (password !== confirmPassword) {
				throw new Error('Passwords do not match')
			}
			const newUser = await this.prisma.user.create({
				data: {
					email,
					password: hashedPassword,
				},
			})
			return { message: 'User created successfully' }
		} catch (error) {
			if(error.code === '9324'){
				console.error(`Error in signup: ${error.message}`)
			}else{
				throw new Error('Signup failed')
			}
		}
	}
}

