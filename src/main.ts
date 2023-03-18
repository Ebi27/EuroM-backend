import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: {
		origin: true ,
		preflightContinue: false,
	}
	})
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	app.use(cookieParser())
	await app.listen(3000)
}
bootstrap()
