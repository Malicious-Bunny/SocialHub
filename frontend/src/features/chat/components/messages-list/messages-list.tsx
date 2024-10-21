import Image from 'next/image';

import { ScrollArea } from '@/components';
import { TMessage } from '@/features/chat';
import { cn } from '@/lib/utils';

type TMessagesListProps = {
  messages: TMessage[];
  currentUserId: number | undefined;
};

export const MessagesList = ({
  messages,
  currentUserId,
}: TMessagesListProps) => {
  return (
    <ScrollArea className="grow">
      {messages.map(({ id, content, sender, senderId }) => (
        <div
          key={id}
          className={cn(
            'flex items-start gap-3 p-5',
            currentUserId === senderId && 'flex-row-reverse'
          )}
        >
          <Image
            className="rounded-full"
            src={sender.image}
            alt="user avatar"
            width={32}
            height={32}
          />
          <p className="bg-muted max-w-xs rounded-md px-3 py-2 text-sm">
            {content}
          </p>
        </div>
      ))}
    </ScrollArea>
  );
};
