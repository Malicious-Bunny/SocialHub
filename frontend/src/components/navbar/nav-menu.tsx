import Link from 'next/link';

import { Button, DialogTrigger, Icons } from '@/components';
import { NotificationsListSheet } from '@/features/notifications';
import { PostFormModal } from '@/features/posts';
import { UserSearchSheet } from '@/features/users';

type TNavMenuProps = {
  username: string | undefined;
};

export const NavMenu = ({ username }: TNavMenuProps) => {
  return (
    <nav className="flex w-full max-w-md flex-row justify-between px-5 py-3 md:flex-col md:gap-3 md:px-3 md:py-10 xl:gap-5 xl:px-4">
      <Button variant="ghost" className="font-normal xl:justify-start" asChild>
        <Link href="/" className="flex items-center gap-4">
          <Icons.home />
          <span className="hidden text-base xl:block">Home</span>
        </Link>
      </Button>
      <UserSearchSheet />
      <NotificationsListSheet />
      <Button
        variant="ghost"
        className="order-5 font-normal md:order-6 xl:justify-start"
        asChild
      >
        <Link href={`/user/${username}`} className="flex items-center gap-4">
          <Icons.user />
          <span className="hidden text-base xl:block">Profile</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="hidden font-normal md:order-4 md:flex xl:justify-start"
        asChild
      >
        <Link href="/chat" className="flex items-center gap-4">
          <Icons.send />
          <span className="hidden text-base xl:block">Messages</span>
        </Link>
      </Button>
      <PostFormModal>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-4 font-normal xl:justify-start"
          >
            <Icons.plusSquare />
            <span className="hidden text-base xl:block">Create</span>
          </Button>
        </DialogTrigger>
      </PostFormModal>
    </nav>
  );
};
