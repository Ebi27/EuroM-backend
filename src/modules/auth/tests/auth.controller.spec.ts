import { Request, Response } from 'express'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'
import { SignupDtoStub } from './stubs/user.stub'
import { SignupDto } from '../dtos/signup.dto'


jest.mock('../services/auth.service')

describe('AuthController', () => {
  let app: INestApplication
  let controller: AuthController
  let service: AuthService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
		}).compile()

		controller = module.get<AuthController>(AuthController)
		service = module.get<AuthService>(AuthService)
		jest.clearAllMocks()
		app = module.createNestApplication()
		await app.init()
	})
 
	describe('signup', () => {
		describe('when the user is created', () => {
			let user: SignupDto
			beforeEach(async () => {
				user = await service.signup(SignupDtoStub())
			})
			test('should return the user', async () => {
		expect(service.signup).toBeCalledWith(SignupDtoStub())
		})
})
	})
})

