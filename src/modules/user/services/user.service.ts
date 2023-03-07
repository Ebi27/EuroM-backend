import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from '../../../../prisma/services/prisma.service'


@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async findUser(id: number, req: Request) {
		const user = await this.prisma.user.findUnique({where: {id}})
		const decodedUser = req.user as {id: number; email: string}
		if (user.id !== decodedUser.id) {
			throw new NotFoundException('User not found')
		}
		delete user.password
		return {user}
	}
	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({where: {email}})
	}

	async getUsers() {
		return await this.prisma.user.findMany({
			select: {id: true, email: true},
		})
	}
}
