import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { createPostType } from 'src/types/posts';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  getPosts() {
    return this.prismaService.posts.findMany();
  }

  createPost(body: createPostType) {
    console.log('body: >>>>>>>>', body);
    return this.prismaService.posts.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: 1,
      },
    });
  }

  updatePost(body: createPostType) {
    return body;
  }

  deletePost(body: createPostType) {
    return body;
  }
}
