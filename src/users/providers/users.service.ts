import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
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

  public findOneById(id: number) {
    return {
      id: 123,
      firstName: 'John',
      lastName: 'Doe',
      email: 'alice@doe.com',
    };
  }
}
