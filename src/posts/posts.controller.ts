import { Body, Controller, Put, Delete, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { createPostType } from 'src/types/posts';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constants';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.Or })
  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  @Auth([AuthType.Bearer], { condition: ConditionGuard.And })
  createPost(@Body() body: createPostType, @ActiveUser() user) {
    console.log(user);

    return this.postService.createPost(body, user.userId);
  }

  @Put(':id')
  updatePost(@Body() body: createPostType) {
    return this.postService.updatePost(body);
  }

  @Delete()
  deletePost(@Body() body: createPostType) {
    return this.postService.deletePost(body);
  }
}
