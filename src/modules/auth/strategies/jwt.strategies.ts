import {Injectable, UnauthorizedException} from '@nestjs/common'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {jwtSecret} from '../../../../utils/constant'
import {JwtPayload} from '../interfaces/jwt-payload.interface'
import {Request} from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJWT,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: jwtSecret,
		})
	}
	private static extractJWT(req: Request): | string | null {
		if (!req.cookies) {
			return null
		}
		return req.cookies.token
	}
	async validate(payload: JwtPayload) {
		return payload
	}
}
