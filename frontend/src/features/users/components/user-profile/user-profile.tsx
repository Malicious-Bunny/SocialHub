'use client';

import { useOptimistic } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button, GoBackButton, Icons, useToast } from '@/components';
import { logoutAction } from '@/features/auth';
import {
  addFollowAction,
  deleteFollowAction,
  EditUserModal,
  TUser,
} from '@/features/users';

export const UserProfile = ({
  id,
  image,
  bio,
  _count,
  isCurrentUserProfile,
  username,
  isFollowing,
}: TUser) => {
  const { toast } = useToast();
  const router = useRouter();
  const [optimisticIsFollowing, setOptimisticIsFollowing] = useOptimistic(
    isFollowing,
    (state) => !state
  );
  const [optimisticFollowersCount, setOptimisticFollowersCount] = useOptimistic(
    _count.followers,
    (state, value: number) => {
      return state + value;
    }
  );

  const followAction = async () => {
    setOptimisticIsFollowing(!optimisticIsFollowing);

    if (optimisticIsFollowing) {
      setOptimisticFollowersCount(-1);
      const error = await deleteFollowAction(id, username);

      if (error)
        toast({
          variant: 'destructive',
          title: 'Oops! Something went wrong.',
          description: error.message,
        });
    } else {
      setOptimisticFollowersCount(1);
      const error = await addFollowAction(id, username);

      if (error)
        toast({
          variant: 'destructive',
          title: 'Oops! Something went wrong.',
          description: error.message,
        });
    }
  };

  const logout = async () => {
    await logoutAction();
    router.push('/sign-in');
  };

  return (
    <>
      <div className="relative flex w-full items-center justify-center border-b pb-3 md:hidden">
        <GoBackButton className="absolute left-2" />
        <h2 className="text-lg font-medium">
          {isCurrentUserProfile ? 'Your account' : username}
        </h2>
        {isCurrentUserProfile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2"
            onClick={logout}
          >
            <Icons.logOut className="size-6" />
          </Button>
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-2 px-5 sm:max-w-xs">
        <Image
          src={image}
          alt="user avatar"
          width={150}
          height={150}
          className="aspect-square rounded-full"
        />
        <h1 className="text-xl">{username}</h1>
        <div className="flex gap-5">
          {Object.entries(_count).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <span className="font-medium">
                {key === 'followers' ? optimisticFollowersCount : value}
              </span>
              <span className="first-letter:uppercase">{key}</span>
            </div>
          ))}
        </div>
        <p className="mb-2 text-center">{bio}</p>
        {isCurrentUserProfile ? (
          <EditUserModal username={username} bio={bio} image={image} />
        ) : (
          <form className="w-full" action={followAction}>
            <Button
              className="w-full"
              variant={optimisticIsFollowing ? 'secondary' : 'default'}
            >
              {optimisticIsFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </form>
        )}
      </div>
    </>
  );
};
