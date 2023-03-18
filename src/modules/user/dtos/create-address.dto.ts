import { IsString, IsOptional } from 'class-validator'

export class CreateUserAddressDto {
	@IsString()
	@IsOptional()
	readonly country: string


	@IsString()
	@IsOptional()
	readonly city: string

	@IsString()
	@IsOptional()
	readonly addressLine1: string

	@IsString()
	@IsOptional()
	readonly addressLine2: string
}