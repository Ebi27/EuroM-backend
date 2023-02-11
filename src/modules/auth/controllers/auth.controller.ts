import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    const success = await this.authService.authenticate(username, password);
    if (success) {
      // Generate a JWT or other token to represent the authenticated user
    } else {
      // Return an error indicating that the authentication failed
    }
  }

  @Post('check')
  async check(@Body() body) {
    const { username, resource } = body;
    const authorized = await this.authService.authorize(username, resource);
    if (authorized) {
      // Return a success message indicating that the user is authorized to access the resource
    } else {
      // Return an error indicating that the authorization failed
    }
  }
}
