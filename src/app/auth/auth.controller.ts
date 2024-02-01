import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { RequestInterface } from './interfaces';
import { isPublic } from '../decorators/public.decorator';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('login')
  login(@Body() login: SignInDTO) {
    return this.authService.signIn(login.username, login.password);
  }

  @Get('profile')
  getProfile(@Request() req: RequestInterface) {
    return req.user;
  }
}
