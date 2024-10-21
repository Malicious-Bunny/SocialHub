import { notFound } from 'next/navigation';

import { getPost, PostItem } from '@/features/posts';
import { TParams } from '@/lib/types';

const PostPage = async ({ params }: TParams) => {
  const { data: post } = await getPost(+params.slug);

  if (!post) notFound();

  return (
    <div className="flex flex-col items-center pb-20 md:ml-20 md:mt-4 md:pb-4 xl:ml-0">
      <PostItem post={post} isPostPage />
    </div>
  );
};

export default PostPage;
