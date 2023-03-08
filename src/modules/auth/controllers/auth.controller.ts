import { Controller, Post, Body , Get, Request, Response } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { LoginDto } from '../dtos/login.dto'
import { SignupDto } from '../dtos/signup.dto'
import { ResetPasswordDto } from '../dtos/reset-password.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signup(@Body() dto: SignupDto) {
		return this.authService.signup(dto)
	}

	@Post('login')
	async login(@Request() req, @Response() res, @Body() dto: LoginDto) {
		return this.authService.login(dto, req, res)
	}

	@Get('signout')
	async signout(@Request() req, @Response() res) {
		return this.authService.signout(req, res)
	}

	@Post('resetPassword')
	async resetPassword(@Request() req, @Body() dto: ResetPasswordDto) {
		return this.authService.resetPassword(req.user.id, dto)
	}

	// @Post('forgotPassword')
	// async forgotPasword(@Request() req, @Response() res) {
	// 	return this.authService.forgotPassword(req, res)
	// }
}
