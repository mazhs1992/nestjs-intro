import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    // Inject the UsersService
    private readonly usersService: UsersService,
  ) {}
  public findAll(userId: string) {
    console.log(userId);

    const user = this.usersService.findOneById(userId);
    console.log(user);

    return [
      {
        user,
        title: 'Post 1',
        content: 'Content 1',
      },
      {
        user,
        title: 'Post 2',
        content: 'Content 2',
      },
    ];
  }

  public create(createPostDto: CreatePostDto) {

  }
}
