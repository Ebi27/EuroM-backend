import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest'
import { AuthService } from '../services/auth.service';
import {INestApplication} from '@nestjs/common'

describe('AuthService', () => {     
    let app: INestApplication
    let service: AuthService
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [AuthService],
        }).compile()
    
        service = module.get<AuthService>(AuthService)
        app = module.createNestApplication()
        await app.init()
    })
    
    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    
    it('should return an array of users', async () => {
        const res = await request(app.getHttpServer()).get('/auth')
        expect(res.status).toBe(200)
        expect(res.body).toEqual([])
    })
    })