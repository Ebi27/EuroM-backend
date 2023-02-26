import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { JwtModule } from '@nestjs/jwt'
// import {AuthInterface} from './interfaces/Jwt-payload.Interface';

@Module({
  imports: [AuthModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
