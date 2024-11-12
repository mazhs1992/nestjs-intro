import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    // Inject the UsersService
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    private readonly usersService: UsersService,
  ) {}
  public async findAll() {
    return await this.postRepository.find({
      // or add the eager flag on post entity
      relations: {
        metaOptions: true,
      },
    });
  }

  public async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);

    return await this.postRepository.save(post);
    // add metaOptions to post
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
    //delete meta option
    await this.metaOptionsRepository.delete(post.metaOptions.id);
    //inform user

    return { deleted: true, id };
  }
}
