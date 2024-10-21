import { ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  useToast,
} from '@/components';
import { deletePostAction } from '@/features/posts';

type TPostItemDeleteAlertProps = {
  children: ReactNode;
  id: number;
};

export const PostItemDeleteAlert = ({
  children,
  id,
}: TPostItemDeleteAlertProps) => {
  const { toast } = useToast();

  const deletePost = async () => {
    const error = await deletePostAction(id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: error.message,
      });
    }

    toast({
      title: 'Post deleted.',
    });
  };

  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deletePost}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete post
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
