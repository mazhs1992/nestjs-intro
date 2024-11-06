import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser() {
    return 'Hello from auth service';
  }
}
