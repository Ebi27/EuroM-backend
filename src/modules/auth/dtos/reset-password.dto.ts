import { IsString, Matches, IsNotEmpty } from 'class-validator'

export class resetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
     { message: 'Password must be between 8 and 15 characters and contain a symbol and a number' }
    ,)
    readonly oldPassword: string
    readonly newPassword: string
}