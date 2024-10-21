'use client';

import {
  AlertDialogTrigger,
  Button,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  useToast,
} from '@/components';
import { env } from '@/env.mjs';
import { PostFormModal, TPost } from '@/features/posts';
import { PostItemDeleteAlert } from '@/features/posts/components/post-item/post-item-delete-alert';

type TPostsListItemDropdownProps = {
  post: TPost;
  isPostPage?: boolean;
};

export const PostItemDropdown = ({
  post,
  isPostPage,
}: TPostsListItemDropdownProps) => {
  const { toast } = useToast();

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`${env.NEXT_PUBLIC_APP_URL}post/${post.id}`);

    toast({
      title: 'Link copied to clipboard!',
    });
  };

  return (
    <PostFormModal post={post}>
      <PostItemDeleteAlert id={post.id}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icons.ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isPostPage && post.isEditable && (
              <>
                <DropdownMenuItem>
                  <AlertDialogTrigger className="flex items-center">
                    <Icons.trash className="text-destructive mr-2 size-4" />
                    <span className="text-destructive font-bold">
                      Delete post
                    </span>
                  </AlertDialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DialogTrigger className="flex items-center">
                    <Icons.edit className="mr-2 size-4" />
                    <span>Edit post</span>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={copyLinkToClipboard}>
              <Icons.copy className="mr-2 size-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PostItemDeleteAlert>
    </PostFormModal>
  );
};
