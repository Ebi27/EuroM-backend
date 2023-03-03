import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator'

export class LoginDto {
	@IsEmail()
	public email: string

	@IsNotEmpty()
	@IsString()
	@Length(8, 20, {
		message: 'Password must be between 8 and 20 characters and contain a symbol and a number',
	})
	public password: string
}
