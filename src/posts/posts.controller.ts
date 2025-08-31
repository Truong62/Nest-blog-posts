import { Body, Controller, Put, Delete, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getPosts(): string {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@Body() body) {
    return this.postService.createPost(body);
  }

  @Put(':id')
  updatePost(@Body() body: any) {
    return this.postService.updatePost(body);
  }

  @Delete()
  deletePost(@Body() body: any) {
    return this.postService.deletePost(body);
  }
}
