import { IsNotEmpty, IsEmail } from 'class-validator'

export class ConfirmPasswordDto {
	@IsNotEmpty()
    @IsEmail()
	email: string
}
