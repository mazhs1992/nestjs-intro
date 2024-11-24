import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserProvider } from './create-user.provider';

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

    private readonly dataSource: DataSource,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  public async findAll() {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        message: 'This route has been moved',
        filename: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        description: 'Occured becasue the API has been moved',
      },
    );
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
    let user;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to proccess your request at the moment',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  public async createMany(createUsesrDto: CreateUserDto[]) {
    return await this.usersCreateManyProvider.createMany(createUsesrDto);
  }
}
