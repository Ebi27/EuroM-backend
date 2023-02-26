import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/modules/user.module'
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from 'prisma/modules/prisma.module'
import {JwtModule} from '@nestjs/jwt'
import { AuthToken } from './modules/auth/Interfaces/Jwt-payload.Interface'

@Module({
	imports: [UserModule, AuthModule, PrismaModule, JwtModule, AuthToken],
})
export class AppModule {}
