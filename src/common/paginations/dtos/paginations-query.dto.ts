import { IsOptional, IsPositive } from 'class-validator';

export class PaginationsQueryDto {
  @IsOptional()
  @IsPositive()
  page?: number = 10;

  @IsOptional()
  @IsPositive()
  limit?: number = 1;
}
