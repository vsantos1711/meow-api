import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new Error('User do not exists');

    const isMatch = compare(password, user.password);
    if (!isMatch) throw new Error('');

    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };

    return {
      username: user.username,
      timestamp: new Date().toISOString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async healthCheck() {
    try {
      const response = await fetch(
        'https://meowhub-api.onrender.com/auth/healt',
      );
      const health = await response.json();
      console.log('Health check result:', health);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  }
}
