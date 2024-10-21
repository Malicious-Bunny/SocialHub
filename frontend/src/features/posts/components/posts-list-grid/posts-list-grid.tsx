import Link from 'next/link';

import { Icons, ImageWithFallback } from '@/components';
import { TPost } from '@/features/posts';

type TPostsListGridProps = {
  posts: TPost[];
};

export const PostsListGrid = ({ posts }: TPostsListGridProps) => {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 justify-center gap-1">
      {posts.map(({ id, image, _count }) => (
        <Link key={id} href={`/post/${id}`} className="relative">
          <ImageWithFallback
            key={id}
            src={image}
            alt="post image"
            width={225}
            height={225}
            className="aspect-square h-auto w-full object-cover"
          />
          <div className="absolute left-0 top-0 hidden size-full items-center justify-center gap-5 bg-black/30 opacity-0 backdrop-blur-sm hover:opacity-100 md:flex">
            <p className="flex items-center font-bold">
              <Icons.heart className="mr-2 size-5 fill-white" /> {_count.likes}
            </p>
            <p className="flex items-center font-bold">
              <Icons.message className="mr-2 size-5 fill-white" />
              {_count.comments}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
