import { IsNotEmpty } from 'class-validator'

export class ConfirmPasswordDto {
	@IsNotEmpty()
	token: string
}
