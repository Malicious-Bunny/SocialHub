'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { getUsersByUsernameAction, TUser } from '@/features/users';
import { useDebounce } from '@/hooks';

export const useSearchUsers = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<TUser[]>([]);
  const debouncedValue = useDebounce(username);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    (async () => {
      if (debouncedValue) {
        const { data } = await getUsersByUsernameAction(debouncedValue);
        setUsers(data || []);
      } else {
        setUsers([]);
      }
    })();
  }, [debouncedValue]);

  return {
    users,
    handleInputChange,
    username,
  };
};
