import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../../../prisma/services/prisma.service'
import { UserService } from '../user/services/user.service'
import { LoginRepository } from '../../repository/auth-repo/login-repo'
import {SignupRepository} from '../../repository/auth-repo/signup-repo'
import {resetPasswordRepository} from '../../repository/auth-repo/reset-password-auth'


@Module({
  imports: [JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    LoginRepository, 
    SignupRepository, 
    resetPasswordRepository,
    PrismaService
  ],
})
export class AuthModule {}
