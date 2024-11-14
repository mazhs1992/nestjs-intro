import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  public login(email: string, password: string, id: number) {
    const user = this.userService.findOneById(id);
    console.log(user);
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
