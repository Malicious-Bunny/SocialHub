import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { JwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { User } from '@prisma/client';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Get()
  @UseGuards(JwtGuard)
  findAll(@GetUser() user: User) {
    return this.conversationsService.findAll(user.id);
  }

  @Get(':conversationId')
  @UseGuards(JwtGuard)
  findOne(@Param() { conversationId }: { conversationId: string }) {
    return this.conversationsService.findOne(+conversationId);
  }

  @Post(':userId')
  @UseGuards(JwtGuard)
  create(@GetUser() user: User, @Param() param: { userId: string }) {
    return this.conversationsService.create([+user.id, +param.userId]);
  }
}
