import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { PrismaService } from 'prisma/services/prisma.service'
import { LoginDto } from '../dtos/login.dto'
import { SignupDto } from '../dtos/signup.dto'
import * as bcrypt from 'bcrypt'
import { AuthToken } from '../interfaces/jwt-payload.interface'


@Injectable()
export class AuthService {
	JwtService: any
	constructor(private prisma: PrismaService, private jwtPayLoad: AuthToken) {}
	async authenticateLogin(dto:LoginDto): Promise<any> {
	const {email, password} = dto
	const foundUser = await this.prisma.user.findUnique({where: {email}})
	 if (!foundUser) {
	 	throw new BadRequestException('User does not exist')
		}
		const passwordMatch = await this.comparePassword(
			password, 
			foundUser.hashedPassword
			)
		if (!passwordMatch) {
			throw new BadRequestException('Incorrect email or password')
		}
		const token = await this.jwtPayLoad({ id: foundUser.id, email: foundUser.email })
		return { token }
	}

	async authorizeLogin(username: string, resource: string): Promise<boolean> {
		// Perform authorization logic here (e.g., check against a database)
		// Return true if the authorization is successful, false otherwise
		return true;
	}
	
	async userSignup(dto:SignupDto): Promise<any> {	
		const {email, username, password} = dto
		const userExist = await this.prisma.user.findUnique({where: {email}})
	if (userExist) {
		throw new BadRequestException('User already exist')
		}
		const hashedPassword = await this.hashPassword(password)
		const newUser = await this.prisma.user.create({
			data: {
				username,
				email,	
				hashedPassword,
			},
		})
		return { message: 'User created successfully' }
	}
	
	async userSignOut(): Promise<any> {	
		// Perform authentication logic here (e.g., check against a database)
		// Return true if the authentication is successful, false otherwise
		return { message: 'User logged out successfully'}
	}

	async hashPassword(password: string) {
		const saltOrRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltOrRounds)
		return hashedPassword
	}
	async comparePassword(password: string, hashedPassword: string) {
		const isPasswordMatch = await bcrypt.compare(password, hashedPassword)
		return isPasswordMatch
	}
}
