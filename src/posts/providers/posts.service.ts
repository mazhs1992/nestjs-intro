import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  public findAll(userId: string) {
    console.log(userId);
    return [
      {
        title: 'Post 1',
        content: 'Content 1',
      },
      {
        title: 'Post 2',
        content: 'Content 2',
      },
    ];
  }
}
