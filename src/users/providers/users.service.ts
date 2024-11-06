import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();

    if (!isAuth) {
      return 'Not authenticated';
    }

    return [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        lastName: 'Doe',
        email: 'alice@doe.com',
      },
    ];
  }

  public findOneById(id: string) {
    return {
      id: 123,
      firstName: 'John',
      lastName: 'Doe',
      email: 'alice@doe.com',
    };
  }
}
