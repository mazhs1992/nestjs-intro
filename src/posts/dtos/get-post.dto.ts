import { IntersectionType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationsQueryDto } from 'src/common/paginations/dtos/paginations-query.dto';

export class GetPostsBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetPostDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationsQueryDto,
) {}
