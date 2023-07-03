import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username, pass) {
    const user = await this.usersService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Wrong Username or Password');
    }
    const { password, ...result } = user;
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
    };

    return {
      Token: await this.jwtService.signAsync(payload),
    };
  }
}
