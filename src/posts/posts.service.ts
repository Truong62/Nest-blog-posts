import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreatePostDTO, UpdatePostDTO, PostModelDTO, mapPostsToDTO } from 'src/shared/models/post.model';
import { setTimeout } from 'timers/promises';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async getPosts(): Promise<PostModelDTO[]> {
    const records = await this.prismaService.posts.findMany();

    await setTimeout(10000);

    return mapPostsToDTO(records);
  }

  async createPost(body: CreatePostDTO, userId: number): Promise<PostModelDTO> {
    const record = await this.prismaService.posts.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return PostModelDTO.fromPersistence(record);
  }

  async updatePost(body: UpdatePostDTO & { id?: number }): Promise<PostModelDTO | null> {
    if (!body.id) return null;
    const record = await this.prismaService.posts.update({
      where: { id: body.id },
      data: {
        ...(body.title ? { title: body.title } : {}),
        ...(body.content ? { content: body.content } : {}),
      },
    });
    return PostModelDTO.fromPersistence(record);
  }

  async deletePost(body: { id: number }): Promise<{ id: number }> {
    await this.prismaService.posts.delete({ where: { id: body.id } });
    return { id: body.id };
  }
}
