'use client';

import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { UserSearchResult } from './user-search-result';

import {
  Button,
  Icons,
  Input,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components';
import { useSearchUsers } from '@/features/users';

export const UserSearchSheet = () => {
  const router = useRouter();
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const { users, handleInputChange, username } = useSearchUsers();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setSelectedUserIndex((prevIndex) =>
        Math.min(prevIndex + 1, users.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      setSelectedUserIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === 'Enter') {
      if (selectedUserIndex !== -1 && users[selectedUserIndex]) {
        const username = users[selectedUserIndex].username;
        router.push(`/user/${username}`);
        setIsOpen(false);
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-4 font-normal xl:justify-start"
        >
          <Icons.search />
          <span className="hidden text-base xl:block">Search</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full pb-28">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <Input
            id="username"
            placeholder="Search"
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={username}
          />
        </SheetHeader>
        <UserSearchResult users={users} selectedUserIndex={selectedUserIndex} />
      </SheetContent>
    </Sheet>
  );
};
