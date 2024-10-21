import { PropsWithChildren } from 'react';

import { Navbar } from '@/components';

const ChatLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar className="hidden md:flex" />
      {children}
    </>
  );
};

export default ChatLayout;
