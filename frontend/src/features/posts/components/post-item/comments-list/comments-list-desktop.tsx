'use client';

import { AddCommentForm } from './add-comment-form';
import { CommentsListItem } from './comments-list-item';

import { TComment } from '@/features/posts';
import { TUser } from '@/features/users';

type TCommentsListDesktopProps = {
  optimisticComments: TComment[];
  postId: number;
  user: Pick<TUser, 'id' | 'username' | 'image'>;
  addOptimisticComment: (action: TComment) => void;
};

export const CommentsListDesktop = ({
  optimisticComments,
  postId,
  user,
  addOptimisticComment,
}: TCommentsListDesktopProps) => {
  return (
    <div className="hidden md:block">
      <AddCommentForm
        user={user}
        postId={postId}
        addOptimisticComment={addOptimisticComment}
      />
      <div className="mt-5 space-y-3">
        {optimisticComments.length ? (
          optimisticComments.map((comment) => (
            <CommentsListItem key={comment.id} {...comment} />
          ))
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium">No comments yet</h3>
            <p className="text-muted-foreground text-sm">
              Start the conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
