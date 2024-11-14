import { Controller, Get } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.login('1', '2', 3);
  }
}
