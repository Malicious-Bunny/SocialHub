import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePost, EditPost } from 'src/posts/types';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  create(data: CreatePost): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async delete(id: number): Promise<Post> {
    const post = await this.findOne(id);

    if (!post) throw new NotFoundException('Post not found');

    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }

  edit(id: number, data: EditPost): Promise<Post> {
    const updateData: EditPost = {
      content: data.content,
    };

    if (data.image) {
      updateData.image = data.image;
    }

    return this.prisma.post.update({
      where: {
        id,
      },
      data: updateData,
    });
  }
}
