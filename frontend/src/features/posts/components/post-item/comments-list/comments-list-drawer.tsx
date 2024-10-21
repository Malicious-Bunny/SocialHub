'use client';

import Link from 'next/link';

import { AddCommentForm } from './add-comment-form';
import { CommentsListItem } from './comments-list-item';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components';
import { TComment } from '@/features/posts';
import { TUser } from '@/features/users';
import { useMediaQuery } from '@/hooks';

type TPostsListItemCommentsProps = {
  addOptimisticComment: (action: TComment) => void;
  optimisticComments: TComment[];
  postId: number;
  user: TUser;
};

export const CommentsListDrawer = ({
  optimisticComments,
  postId,
  user,
  addOptimisticComment,
}: TPostsListItemCommentsProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop)
    return (
      <Link href={`/post/${postId}`}>{optimisticComments.length} comments</Link>
    );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>{optimisticComments.length} comments</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
        </DrawerHeader>
        {optimisticComments.length ? (
          <div className="scrollbar mt-2 h-[50vh] space-y-3 overflow-y-auto px-4">
            {optimisticComments.map((comment) => (
              <CommentsListItem key={comment.id} {...comment} />
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center">
            <h3 className="text-lg font-medium">No comments yet</h3>
            <p className="text-muted-foreground text-sm">
              Start the conversation.
            </p>
          </div>
        )}
        <DrawerFooter>
          <AddCommentForm
            user={user}
            postId={postId}
            addOptimisticComment={addOptimisticComment}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
