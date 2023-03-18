import { Injectable } from '@nestjs/common'
import { ForgotPasswordDto } from '../dtos/forgot-password.dto'
import { LoginService } from './local/login.service'
import { SignupService } from './local/signup.service'
import { PasswordResetService } from './local/password-reset.service'
import { SignupDto } from '../dtos/signup.dto'
import { LoginDto } from '../dtos/login.dto'
import { ResetPasswordDto } from '../dtos/reset-password.dto'
import {Request, Response} from 'express'

@Injectable()
export class AuthService {
	constructor(
		private loginService: LoginService, 
		private signupService: SignupService,
		private resetPasswordService: PasswordResetService,
		) {}


   async signup(dto: SignupDto): Promise<any>{
		return this.signupService.signup(dto)
	}
	
	async login(dto: LoginDto, req: Request, res: Response) {
		return this.loginService.login(dto, req, res)
	}

	async signout(req: Request, res: Response) {
		res.clearCookie('token')
		return res.send({message: 'You have been logged out successfully'})
	}
 

	async resetPassword(userId: number, resetPasswordDto: ResetPasswordDto) {
		return this.resetPasswordService.resetPassword(userId, resetPasswordDto)
	}

	async forgotPassword(dto: ForgotPasswordDto, req: Request, res: Response) {
		//send email to user with a link to reset password
	}

	
}

