import * as request from 'supertest'
import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import {AuthController} from '../controllers/auth.controller'

describe('AuthController', () => {
  let app: INestApplication
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    app = module.createNestApplication()
    await app.init()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return an array of users', async () => {
    const res = await request(app.getHttpServer()).get('/auth')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })
})
