import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}
@UseGuards(JwtAuthGuard)
@Get(':id')
getUserById(@Param() params: { id: number }, @Req() req) {
 return this.userService.findUser(params.id, req)
}

@UseGuards(JwtAuthGuard)
@Get(':email')
getUserByEmail(@Param() params: { email: string }, @Req() req) {
    return this.userService.findByEmail(params.email, req)
}

@Get()
getUsers(){
    return this.userService.getUsers()
}
}
