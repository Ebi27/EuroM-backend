import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/modules/user.module'
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from 'prisma/modules/prisma.module'
import {JwtModule} from '@nestjs/jwt'


@Module({
	imports: [UserModule, JwtModule, AuthModule, PrismaModule],
})
export class AppModule {}
