import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from './meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async getAllMetaOptions() {
    return await this.metaOptionsRepository.find();
  }

  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    const newMetaOption = this.metaOptionsRepository.create({
      ...createPostMetaOptionsDto,
    });
    return await this.metaOptionsRepository.save(newMetaOption);
  }
}
