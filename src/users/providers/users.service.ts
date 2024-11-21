import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
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

  public async findAll() {
    const isAuth = this.authService.isAuth();

    const value = process.env.TEST_VALUE;
    const envValue = this.configService.get<string>('TEST_VALUE');
    console.log('envValue ', envValue, value);

    console.log('profileConfiguration', this.profileConfiguration);

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
