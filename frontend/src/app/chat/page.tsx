import { Icons } from '@/components';
import { ConversationsList } from '@/features/chat';

const ChatPage = () => {
  return (
    <>
      <div className="hidden h-screen flex-col items-center justify-center xl:flex">
        <Icons.messageCircle className="mb-3" />
        <h3 className="text-lg font-medium">Your messages</h3>
        <p className="text-muted-foreground text-sm">
          Send private photos and messages to friends.
        </p>
      </div>
      <ConversationsList />
    </>
  );
};

export default ChatPage;
