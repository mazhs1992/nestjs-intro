import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostDto } from './dtos/get-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostDto,
  ) {
    console.log(`userId: ${userId}`);
    console.log(`postQuery: ${JSON.stringify(postQuery)}`);
    return this.postService.findAll();
  }

  @Get()
  public getAllPosts() {
    return this.postService.findAll();
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postService.create(createPostDto);
    } catch (error) {
      return error.message;
    }
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    console.log(`id: ${id}`);
    return this.postService.delete(id);
  }

  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.update(patchPostDto);
  }
}
