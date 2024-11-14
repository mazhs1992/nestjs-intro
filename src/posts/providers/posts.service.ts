import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class PostsService {
  constructor(
    // Inject the UsersService
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
  ) {}

  public async findAll() {
    return await this.postRepository.find({
      // or add the eager flag on post entity
      relations: {
        metaOptions: true,
        // author: true,
      },
    });
  }

  public async create(createPostDto: CreatePostDto) {
    try {
      // find author from authorId
      const author = await this.usersService.findOneById(
        createPostDto.authorId,
      );

      if (!author) {
        return 'Author not found';
      }

      const tags = await this.tagsService.findMultibleTags(createPostDto.tags);
      const post = this.postRepository.create({
        ...createPostDto,
        author: author,
        tags,
      });

      return await this.postRepository.save(post);
      // add metaOptions to post
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    //find the post
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      return 'Post not found';
    }

    // const invertPost = await this.metaOptionsRepository.find({
    //   where: { id: post.metaOptions.id },
    //   relations: ['post'],
    // });

    //delete the post
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
