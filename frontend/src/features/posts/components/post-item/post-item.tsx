import moment from 'moment/moment';
import Link from 'next/link';

import { CommentsList } from './comments-list';
import { PostItemDropdown } from './post-item-dropdown';
import { PostItemHeader } from './post-item-header';

import { Icons, ImageWithFallback } from '@/components';
import { getComments, TPost } from '@/features/posts';
import { getMe, UserCard } from '@/features/users';

type TPostItemProps = {
  post: TPost;
  isPostPage?: boolean;
};

export const PostItem = async ({ post, isPostPage }: TPostItemProps) => {
  const { createdAt, image, content, id, user, isUpdated } = post;
  const { data: comments } = await getComments(id);
  const { data: currentUser } = await getMe();

  return (
    <>
      {isPostPage && <PostItemHeader />}
      <div className="max-w-xl [&:not(:last-child)]:border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <UserCard {...user} />
            <Icons.dot className="text-muted-foreground size-5" />
            <span className="text-muted-foreground text-sm">
              {moment(createdAt).fromNow()} {isUpdated && '(edited)'}
            </span>
          </div>
          <PostItemDropdown post={post} isPostPage={isPostPage} />
        </div>
        <p className="px-4 pb-4">{content}</p>
        <ImageWithFallback
          alt="post image"
          src={image}
          width={600}
          height={600}
          className="md:hidden"
        />
        <Link href={`/post/${id}`} className="hidden md:block">
          <ImageWithFallback
            alt="post image"
            src={image}
            width={600}
            height={600}
          />
        </Link>
        <CommentsList
          post={post}
          comments={comments!}
          isPostPage={isPostPage}
          currentUser={currentUser!}
        />
      </div>
    </>
  );
};
