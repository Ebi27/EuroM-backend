import {Injectable} from '@nestjs/common'
import {IsEmail, IsNotEmpty, IsString, Length, IsOptional, Matches } from 'class-validator'

	export class SignupDto {
		@IsEmail()
		public email: string

		@IsNotEmpty()
		@IsString()
		@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/, {
			message: 'Password must be between 8 and 15 characters and contain a symbol and a number',
		})
		readonly password: string

		@IsNotEmpty()
		@IsString()
		readonly confirmPassword: string
	}
