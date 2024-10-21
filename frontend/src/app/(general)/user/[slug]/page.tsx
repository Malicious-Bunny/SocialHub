import { notFound } from 'next/navigation';

import { PostsListGrid } from '@/features/posts';
import { getUser, UserProfile } from '@/features/users';
import { TParams } from '@/lib/types';

const UserPage = async ({ params }: TParams) => {
  const { data: user } = await getUser(params.slug);

  if (!user) notFound();

  return (
    <div className="flex flex-col items-center space-y-8 pb-20 pt-3 md:ml-20 md:pt-8 xl:ml-0">
      <UserProfile {...user} />
      <PostsListGrid posts={user.posts} />
    </div>
  );
};

export default UserPage;
