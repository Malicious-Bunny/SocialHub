import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import { GoBackButton, Icons } from '@/components';
import { TConversation, UserSelectionModal } from '@/features/chat';
import { cn } from '@/lib/utils';

type TConversationsListProps = {
  className?: string;
};

const conversations: TConversation[] = [
  {
    id: 1,
    participants: [{ username: 'Kubx1999', image: '/user.jpg' }],
    messages: [
      {
        id: 1,
        content: 'wiadomość wyslałana',
        senderId: 1,
        sender: { username: 'Kubx1999', image: '/user.jpg' },
        createdAt: new Date().setDate(20),
      },
    ],
    createdAt: new Date().setDate(20),
  },
  {
    id: 2,
    participants: [{ username: 'Kubx1999', image: '/user.jpg' }],
    messages: [
      {
        id: 1,
        content: 'wiadomość wyslałana',
        senderId: 1,
        sender: { username: 'Kubx1999', image: '/user.jpg' },
        createdAt: new Date().setDate(20),
      },
    ],
    createdAt: new Date().setDate(15),
  },
];

export const ConversationsList = ({ className }: TConversationsListProps) => {
  return (
    <div
      className={cn(
        'bg-background w-full md:ml-20 md:w-auto xl:absolute xl:right-0 xl:top-0 xl:z-20 xl:ml-0 xl:min-h-full xl:w-full xl:max-w-sm xl:border-l xl:px-8 xl:py-7',
        className
      )}
    >
      <div className="bg-background sticky top-0 flex w-full items-center justify-between border-b px-4 py-3 md:px-5 md:pb-5 md:pt-7 xl:static xl:mb-5 xl:border-none xl:p-0">
        <GoBackButton className="md:hidden" />
        <h2 className="text-lg font-medium">Messages</h2>
        <UserSelectionModal />
      </div>
      <div className="space-y-5 p-5 xl:p-0">
        {conversations.map(({ id, participants, messages, createdAt }) => (
          <Link
            href={`/chat/${id}`}
            key={id}
            className="flex items-center gap-3"
          >
            <Image
              src={participants[0].image}
              alt="user avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p>{participants[0].username}</p>
              <p className="text-muted-foreground flex items-center text-sm">
                {messages[0].content.slice(0, 20)}...
                <Icons.dot />
                {moment(createdAt).fromNow()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
