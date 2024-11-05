import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password : Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;
}
