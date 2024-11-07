import { IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
