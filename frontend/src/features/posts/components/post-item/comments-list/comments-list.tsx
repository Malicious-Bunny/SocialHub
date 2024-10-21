'use client';

import { useOptimistic } from 'react';

import { AddLikeButton } from '../add-like-button';
import { CommentsListDesktop } from './comments-list-desktop';
import { CommentsListDrawer } from './comments-list-drawer';

import { TComment, TPost } from '@/features/posts';
import { TUser } from '@/features/users';

type TCommentsListProps = {
  comments: TComment[];
  post: TPost;
  isPostPage?: boolean;
  currentUser: TUser;
};

export const CommentsList = ({
  comments,
  post,
  isPostPage,
  currentUser,
}: TCommentsListProps) => {
  const { id, isLiked, _count, user } = post;
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: TComment) => [newComment, ...state]
  );

  return (
    <>
      <div className="flex items-center justify-between p-4 text-sm">
        <AddLikeButton isLiked={isLiked} _count={_count} id={id} />
        {optimisticComments && (
          <CommentsListDrawer
            addOptimisticComment={addOptimisticComment}
            optimisticComments={optimisticComments}
            postId={id}
            user={currentUser!}
          />
        )}
      </div>
      {isPostPage && optimisticComments && (
        <CommentsListDesktop
          addOptimisticComment={addOptimisticComment}
          optimisticComments={optimisticComments}
          postId={id}
          user={user}
        />
      )}
    </>
  );
};
