import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'The id of the user',
    example: 1231,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
