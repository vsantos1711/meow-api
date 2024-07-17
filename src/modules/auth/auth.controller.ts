import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggedInUser } from './decorators/logged-in-user.decorator';
import { LoggedUser } from './interfaces/logged-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() login: SignInDTO) {
    return this.authService.signIn(login.username, login.password);
  }

  @Get('profile')
  getProfile(@LoggedInUser() user: LoggedUser) {
    return user;
  }

  @Public()
  @Get('health')
  healthCheck() {
    return '🌳 ALL GREEN AND UP!';
  }
}
