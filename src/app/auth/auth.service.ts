import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error('User do not exists');

    const isMatch = compare(password, user.password);
    if (!isMatch) throw new Error('');

    const payload = { email: user.email, sub: user.id, name: user.name };

    return {
      username: user.name,
      timestamp: new Date().toISOString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
