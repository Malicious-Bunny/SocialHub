import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Conversation } from '@prisma/client';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        participants: true,
        messages: true,
      },
    });
  }

  findOne(conversationId: number): Promise<Conversation> {
    return this.prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: true,
        messages: true,
      },
    });
  }

  async create(participantIds: number[]): Promise<Conversation> {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        AND: participantIds.map((id) => ({
          participants: {
            some: { id },
          },
        })),
      },
    });

    if (conversation) return conversation;

    return this.prisma.conversation.create({
      data: {
        participants: {
          connect: participantIds.map((id) => ({ id })),
        },
      },
    });
  }
}
