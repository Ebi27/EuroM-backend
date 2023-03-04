import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}
//create route to get a user by id 
@UseGuards(JwtAuthGuard)
@Get(':id')
getUserById(@Param() params: { id: number }, @Req() req) {
 return this.userService.getUserById(params.id, req)
}


//create route to get all users 
@Get()
getUsers(){
    return this.userService.getUsers()
}
}
