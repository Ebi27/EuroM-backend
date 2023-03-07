import { Module } from '@nestjs/common'
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategies'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'

@Module({
	controllers: [UserController],
	providers: [UserService, JwtStrategy],
})
export class UserModule {}
