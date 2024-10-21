'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icons,
  Input,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
} from '@/components';
import { Button, Dialog, DialogContent, DialogTrigger } from '@/components/ui';
import { useSearchUsers } from '@/features/users';

export const UserSelectionModal = () => {
  const [selectedUsername, setSelectedUsername] = useState('');
  const { handleInputChange, username, users } = useSearchUsers();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.edit className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">New message</DialogTitle>
          <Input
            id="username"
            placeholder="Search user"
            onChange={handleInputChange}
            value={username}
          />
        </DialogHeader>
        <ScrollArea className="h-96">
          <RadioGroup onValueChange={(value) => setSelectedUsername(value)}>
            {users.length ? (
              users.map(({ id, username, image }) => (
                <div
                  key={id}
                  className="flex items-center justify-between px-2"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={image}
                      alt="user avatar"
                      width={32}
                      height={32}
                      className="aspect-square rounded-full"
                    />
                    <p className="text-base font-normal">{username}</p>
                  </div>
                  <RadioGroupItem value={username} id={username} />
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                User not found
              </p>
            )}
          </RadioGroup>
        </ScrollArea>
        <DialogFooter>
          <Button disabled={!selectedUsername} className="w-full">
            Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
