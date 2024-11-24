import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async signIn(signInDto: SigninDto) {
    try {
      const user = await this.userService.findUserByEmail(signInDto.email);

      let isEqual: boolean = false;

      try {
        isEqual = await this.hashingProvider.comparePassword(
          signInDto.password,
          user.password,
        );
      } catch (error) {
        throw new RequestTimeoutException('Request Timeout');
      }

      if (!isEqual) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );
      return { accessToken };
    } catch (error) {
      return { error: error.message };
    }
  }
}
