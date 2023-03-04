import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'
import {PrismaService} from '../../../../prisma/services/prisma.service'
import { LoginDto } from '../dtos/login.dto'
import { SignupDto } from '../dtos/signup.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { jwtSecret } from '../../../../utils/constant'
import { Request, Response } from 'express'


@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private JwtService: JwtService
	) {}

	async signup(dto: SignupDto) {
		const {email, username, password} = dto
		const userExist = await this.prisma.user.findUnique({
			where: {
				email,
			}})
		if (userExist) {
			throw new BadRequestException('User already exist')
		}
		const hashedPassword = await this.hashPassword(password)
		 await this.prisma.user.create({
			data: {
				username,
				email,
				hashedPassword,
			},
		})
		return {message: 'User created successfully'}
	}

	async login(dto: LoginDto, req: Request, res: Response) {
		const {email, password} = dto
		const foundUser = await this.prisma.user.findUnique({
			where: {
				email,
			}})
		if (!foundUser) {
			throw new BadRequestException('User does not exist')
		}
		const passwordMatch = await this.comparePassword(password, foundUser.hashedPassword)
		if (!passwordMatch) {
			throw new BadRequestException('Incorrect email or password')
		}
		const token = await this.signToken({
			id: foundUser.id, 
			email: foundUser.email
		})
		if (!token) {
			throw new ForbiddenException('Unable to login')
		}
		res.cookie('token', token, {})
		return res.send({ message: 'You have been logged in successfully' })
	}

	async signout(req: Request, res: Response) {
        res.clearCookie('token')
		return res.send({ message: 'You have been logged out successfully' })
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
	async signToken(payload: JwtPayload): Promise<string> {
		const token = await this.JwtService.signAsync(payload, {
			secret: jwtSecret,
		})
		return token
	}
}
