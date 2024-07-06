import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { RequestInterface } from './interfaces/request';
import { isPublic } from './decorators/public.decorator';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { LoggedInUser } from './decorators/logged-in-user.decorator';
import { LoggedUser } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('login')
  login(@Body() login: SignInDTO) {
    return this.authService.signIn(login.username, login.password);
  }

  @Get('profile')
  getProfile(@LoggedInUser() user: LoggedUser) {
    return user;
  }

  @isPublic()
  @Get('health')
  healthCheck() {
    return '🌳 ALL GREEN AND UP!';
  }
}
