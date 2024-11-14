import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    // Inject the UsersService
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    try {
      const tag = this.tagRepository.create(createTagDto);
      return await this.tagRepository.save(tag);
    } catch (error) {
      return error.message;
    }
  }

  public async findAll() {
    return await this.tagRepository.find();
  }

  public async findMultibleTags(tags: number[]) {
    return await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });
  }

  public async delete(id: number) {
    console.log('HELLO');
    await this.tagRepository.delete(id);
    return { deleted: true, id };
  }
}
