import Image from 'next/image';
import Link from 'next/link';

import { Button, Icons } from '@/components';
import {
  ConversationsList,
  MessagesList,
  SendMessageForm,
  TConversation,
} from '@/features/chat';
import { getMe } from '@/features/users';
import { TParams } from '@/lib/types';

const getConversation = (id: number) => {
  return {
    id,
    participants: [{ username: 'Kubx1999', image: '/user.jpg' }],
    messages: [
      {
        id: 1,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, quae?',
        sender: { username: 'Kubx1999', image: '/user.jpg' },
        senderId: 1,
        createdAt: new Date().setDate(20),
      },
      {
        id: 2,
        content: 'wiadomość wyslałana',
        sender: { username: 'Kubx1999', image: '/user.jpg' },
        senderId: 2,
        createdAt: new Date().setDate(20),
      },
      {
        id: 3,
        content: 'wiadomość wyslałana',
        sender: { username: 'Kubx1999', image: '/user.jpg' },
        senderId: 1,
        createdAt: new Date().setDate(20),
      },
    ],
    createdAt: new Date().setDate(20),
  } as TConversation;
};

const ConversationPage = async ({ params }: TParams) => {
  const { data: user } = await getMe();
  const conversation = getConversation(+params.slug);

  return (
    <>
      <div className="xl:relative xl:left-[-32px] xl:flex xl:justify-center">
        <div className="flex h-screen flex-col md:ml-20 xl:ml-0 xl:w-[calc(100vw-706px)]">
          <div className="flex items-center justify-between border-b px-4 py-3 md:px-5 md:pb-5 md:pt-7">
            <Button variant="ghost" size="icon" asChild className="md:hidden">
              <Link href="/chat">
                <Icons.arrowLeft />
              </Link>
            </Button>
            <Link
              className="flex items-center gap-3"
              href={`/user/${conversation.participants[0].username}`}
            >
              <Image
                className="rounded-full"
                src={conversation.participants[0].image}
                alt="user avatar"
                width={32}
                height={32}
              />
              <p>{conversation.participants[0].username}</p>
            </Link>
            <Button variant="ghost" size="icon">
              <Icons.ellipsis />
            </Button>
          </div>
          <MessagesList
            messages={conversation.messages}
            currentUserId={user?.id}
          />
          <SendMessageForm />
        </div>
      </div>
      <ConversationsList className="hidden xl:block" />
    </>
  );
};

export default ConversationPage;
