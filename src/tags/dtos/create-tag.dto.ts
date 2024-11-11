import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
  IsJSON,
  IsUrl,
} from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be a valid slug',
  })
  @MaxLength(256)
  slug: string;

  @IsOptional()
  description?: string;

  @IsJSON()
  schema?: string;

  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
