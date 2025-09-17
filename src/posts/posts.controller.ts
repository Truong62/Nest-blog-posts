import { Body, Controller, Put, Delete, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO, UpdatePostDTO } from 'src/shared/models/post.model';
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
  createPost(@Body() body: CreatePostDTO, @ActiveUser() user: { userId: number }) {
    console.log(user);

    return this.postService.createPost(body, user.userId);
  }

  @Put(':id')
  updatePost(@Body() body: UpdatePostDTO) {
    return this.postService.updatePost(body);
  }

  @Delete()
  deletePost(@Body() body: { id: number }) {
    return this.postService.deletePost(body);
  }
}
