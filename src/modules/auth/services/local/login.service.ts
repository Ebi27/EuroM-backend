import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'
import {PrismaService} from '../../../../../prisma/services/prisma.service'
import { LoginDto } from '../../dtos/login.dto'
import { HashService } from '../hash/hash.service'
import { Request, Response } from 'express'



@Injectable()
export class LoginService {
    constructor(
        private prisma: PrismaService, 
        private hash: HashService
        ) {}

	async login(dto: LoginDto, req: Request, res: Response): Promise<{ token: string }> {
		const {email, password} = dto
		const foundUser = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})
		if (!foundUser) {
			throw new BadRequestException('User does not exist')
		}
		const passwordMatch = await this.hash.comparePassword({
			password,
			hash: foundUser.password,
		})
		if (!passwordMatch) {
			throw new BadRequestException('Incorrect email or password')
		}
		const token = await this.hash.signToken({
			id: foundUser.id,
			email: foundUser.email,
		})
		console.log(token)
		if (!token) {
			throw new ForbiddenException('Unable to login, please try again')
		}
		res.cookie('token', token, {
			httpOnly: true,
			secure: true,
		})
		return { token }
	}
}