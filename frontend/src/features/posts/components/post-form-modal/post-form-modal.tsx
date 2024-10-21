'use client';

import { ReactNode, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import {
  createPostFormSchema,
  defaultValues,
  TCreatePostFormSchema,
} from './validation-schema';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  Textarea,
  useToast,
} from '@/components';
import { createPostAction, editPostAction, TPost } from '@/features/posts';

type TPostFormModalProps = {
  post?: TPost;
  children: ReactNode;
};

export const PostFormModal = ({ children, post }: TPostFormModalProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TCreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: post ? { content: post.content } : defaultValues,
  });
  const [image, setImage] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>(post?.image);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
    setImageUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/jpeg': [], 'image/png': [] },
  });

  const onSubmit = async ({ content }: TCreatePostFormSchema) => {
    if (!post && !image) return;

    const formData = new FormData();
    formData.append('image', image!);
    formData.append('content', content);

    let error;

    if (post) {
      error = await editPostAction(formData, post.id);
    } else {
      error = await createPostAction(formData);
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: error.message,
      });
    }

    toast({
      title: post ? 'Post edited.' : 'Post added.',
    });

    if (!post) form.reset();
    if (!post) setImageUrl(undefined);
    setImage(undefined);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{post ? 'Edit post' : 'Create post'}</DialogTitle>
          <DialogDescription>
            {post
              ? 'Edit image or content in post. Click save when you are done.'
              : 'Add image and content to post. Click save when you are done.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <div
              className="flex flex-col items-center justify-center rounded-md border p-10 text-center"
              {...getRootProps()}
            >
              <Input id="image" {...getInputProps()} />
              <Icons.uploadClout className="text-primary size-16 stroke-1" />
              <p>Drop your image here, or browse</p>
              <span className="text-muted-foreground text-sm">
                PNG, JPG are allowed
              </span>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {imageUrl && (
          <div className="relative w-fit">
            <Image
              src={imageUrl}
              className="h-32 rounded-md object-cover"
              alt="post image"
              width={500}
              height={500}
            />
            <Button
              onClick={() => setImageUrl(undefined)}
              className="absolute right-2 top-2 size-6"
              variant="secondary"
              size="icon"
            >
              <Icons.x className="size-4" />
            </Button>
          </div>
        )}
        <DialogFooter className="justify-center">
          <Button
            form="form"
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Icons.loader className="mr-2 size-4 animate-spin" />
            )}
            {post ? 'Edit post' : 'Create post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
