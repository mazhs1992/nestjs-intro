import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      return 'User already exists';
    }
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }

  public async findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();

    const value = process.env.TEST_VALUE;
    const envValue = this.configService.get<string>('TEST_VALUE');
    console.log('envValue ', envValue, value);

    if (!isAuth) {
      return 'Not authenticated';
    }

    const users = await this.userRepository.find();
    return users;
  }

  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
