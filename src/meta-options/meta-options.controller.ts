import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionService: MetaOptionsService) {}

  @Get()
  getAllMetaOptions() {
    return this.metaOptionService.getAllMetaOptions();
  }

  @Post()
  createMetaOption(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    return this.metaOptionService.create(createPostMetaOptionsDto);
  }
}
