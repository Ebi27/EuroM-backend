import { Controller, Post, Body , Get, UseGuards} from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { LoginDto } from '../dtos/login.dto'
import { SignupDto } from '../dtos/signup.dto'	
import {JwtAuthGuard} from '../guards/jwt-auth.guard'


// @Controller('protected')
// export class ProtectedController {
// 	@Get()
// 	@UseGuards(JwtAuthGuard)
// 	getProtectedData() {
// 		return {message: 'This is protected data!'}
// 	}
// }


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() LoginDto: LoginDto) {
		const {email, password} = LoginDto
		const loginSuccessfull = await this.authService.authenticateLogin(LoginDto)
		if (loginSuccessfull) {
			// Generate a JWT or other token to represent the authenticated user
		} else {
			// Return an error indicating that the authentication failed
		}
	}

	@Post('lookup')
	async lookup(@Body() body) {
		const {username, resource} = body
		const userIsAuthorized = await this.authService.authorizeLogin(username, resource)
		if (userIsAuthorized) {
			// Return a success message indicating that the user is authorized to access the resource
		} else {
			// Return an error indicating that the authorization failed
		}
	}

	@Post('signup')
	async signup(@Body() SignupDto: SignupDto) {
		const {username, password} = SignupDto
		const signupSuccessfull = await this.authService.userSignup(SignupDto)
		if (signupSuccessfull) {
			// Generate a JWT or other token to represent the authenticated user
		} else {
			// Return an error indicating that the authentication failed
		}
	}

	@Get('signout')
	async signout(@Body() body) {
		const {username, password} = body
		const signoutSuccessfull = await this.authService.userSignOut()
		if (signoutSuccessfull) {
			// Generate a JWT or other token to represent the authenticated user
		} else {
			// Return an error indicating that the authentication failed
		}
	}
}
