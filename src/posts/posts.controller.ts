import { Body, Controller, Put, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { createPostType } from 'src/types/posts';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.Or })
  @Get()
  @UseGuards(ApiKeyGuard)
  @UseGuards(AccessTokenGuard)
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@Body() body: createPostType) {
    return this.postService.createPost(body);
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
