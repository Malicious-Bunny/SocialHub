import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config';
import { JwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { Post as PostType, User } from '@prisma/client';
import { CreatePostDto, EditPostDto } from 'src/posts/dto';
import { LikesService } from 'src/likes/likes.service';
import { getImageUrl } from 'src/common/helpers';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private likesService: LikesService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  async findAll(@GetUser() user: User): Promise<PostType[]> {
    const posts = await this.postsService.findAll();

    return await Promise.all(
      posts.map(async (post) => {
        const isEditable = post.userId === user.id;
        const isUpdated =
          new Date(post.updatedAt).getTime() !==
          new Date(post.createdAt).getTime();

        const isLiked = !!(await this.likesService.findOne({
          postId: post.id,
          userId: user.id,
        }));
        return { ...post, isLiked, isEditable, isUpdated };
      }),
    );
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param() { id }: { id: string }, @GetUser() user: User) {
    const post = await this.postsService.findOne(+id);

    const isEditable = post.userId === user.id;
    const isUpdated =
      new Date(post.updatedAt).getTime() !== new Date(post.createdAt).getTime();
    const isLiked = !!(await this.likesService.findOne({
      postId: post.id,
      userId: user.id,
    }));

    return { ...post, isLiked, isEditable, isUpdated };
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  edit(
    @Param() { id }: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() editPostDto: EditPostDto,
  ): Promise<PostType> {
    return this.postsService.edit(+id, {
      content: editPostDto.content,
      image: file ? getImageUrl(file.filename) : null,
    });
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  delete(@Param() { id }: { id: string }) {
    return this.postsService.delete(+id);
  }

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostType> {
    return this.postsService.create({
      userId: user.id,
      content: createPostDto.content,
      image: getImageUrl(file.filename),
    });
  }
}
