import { Controller, Get, Param, UseGuards, Req, Patch, Delete } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
    constructor (private userService: UserService) {}

@UseGuards(JwtAuthGuard)
@Get('/:id')
getUserById(@Param() params: { id: number }, @Req() req) {
 return this.userService.getUserById(params.id, req)
}

@UseGuards(JwtAuthGuard)
@Get('/:email')
getUserByEmail(@Param() params: { email: string }, @Req() req) {
    return this.userService.getUserByEmail(params.email)
}

@Get()
getAllUsers(){
    return this.userService.getUsers()
}

// @Patch('/:id')
// updateUser(@Param() params: { id: number }, @Req() req) {
//     return this.userService.updateUser(params.id, req)
// }

// @Delete('/:id')
// deleteUser(@Param() params: { id: number }, @Req() req) {
//     return this.userService.deleteUser(params.id, req)
// }
}