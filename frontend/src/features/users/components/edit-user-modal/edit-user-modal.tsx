'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { editUserModalSchema, TEditUserModalSchema } from './validation-schema';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { editUserAction, TUser } from '@/features/users';

export const EditUserModal = (
  user: Pick<TUser, 'username' | 'image' | 'bio'>
) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TEditUserModalSchema>({
    resolver: zodResolver(editUserModalSchema),
    defaultValues: {
      username: user.username,
      bio: user.bio,
    },
  });
  const [image, setImage] = useState<File | null>();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/jpeg': [], 'image/png': [] },
  });

  const onSubmit = async ({ username, bio }: TEditUserModalSchema) => {
    const formData = new FormData();
    formData.append('image', image as File);
    formData.append('username', username);
    formData.append('bio', bio);

    const { data, error } = await editUserAction(formData);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: error.message,
      });
    }

    if (data) {
      toast({
        title: 'Account updated.',
      });

      setIsOpen(false);
      router.push(`/user/${data?.username}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Edit account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
          <DialogDescription>
            Edit image, username or bio. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <div {...getRootProps()} className="relative flex justify-center">
              <input {...getInputProps()} />
              <Image
                src={image ? URL.createObjectURL(image) : user.image}
                alt="user avatar"
                width={100}
                height={100}
                className="aspect-square size-24 rounded-full border brightness-50"
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Icons.camera />
              </div>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
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
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
