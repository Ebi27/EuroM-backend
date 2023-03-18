import { Injectable, UnauthorizedException } from '@nestjs/common'
import {PrismaService} from '../../../../../prisma/services/prisma.service'
import { LoginService } from './login.service'
import { ResetPasswordDto } from '../../dtos/reset-password.dto'
import { ForgotPasswordDto } from '../../dtos/forgot-password.dto'
import { HashService } from '../hash/hash.service'

@Injectable()
export class PasswordResetService {
    
	constructor(
        private prisma: PrismaService, 
        private login: LoginService,
		private hash: HashService
        ) {}

	async resetPassword(userId: number, resetPasswordDto: ResetPasswordDto) {
		const {oldPassword, newPassword} = resetPasswordDto

		// Verify the old password matches the one in the database
		const user = await this.prisma.user.findUnique({where: 
			{
				id: userId
			}})
		if (!user) {
			throw new UnauthorizedException('Invalid credentials')
		}
        const isOldPasswordValid = await this.hash.comparePassword({
            password: oldPassword,
            hash: user.password
        })
		if (!isOldPasswordValid) {
			throw new UnauthorizedException('Invalid credentials')
		}
		// Hash the new password and update the user's password in the database
		const hashedPassword = await this.hash.hashPassword(newPassword)
		await this.prisma.user.update({
			where: {id: userId},
			data: {password: hashedPassword},
		})

		return {message: 'Password reset successful'}
	}
	async forgotPassword(dto:ForgotPasswordDto){
		//check if email exist in the db 

		//send link to email 
	}
}
