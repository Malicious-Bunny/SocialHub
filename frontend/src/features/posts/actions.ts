'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  addLike,
  createComment,
  createPost,
  deleteLike,
  deletePost,
  editPost,
  TCreateCommentCommand,
} from '@/features/posts';

export const createCommentAction = async (body: TCreateCommentCommand) => {
  const { error } = await createComment(body);

  if (error) return error;

  revalidateTag(`comments/${body.postId}`);
};

export const addLikeAction = async (postId: number) => {
  try {
    const { error } = await addLike(postId);

    if (error) return error;
  } catch (e) {
    console.log(e);
  }

  revalidateTag('posts');
};

export const deleteLikeAction = async (postId: number) => {
  const { error } = await deleteLike(postId);

  if (error) return error;

  revalidateTag('posts');
};

export const createPostAction = async (formData: FormData) => {
  const { error } = await createPost(formData);

  if (error) return error;

  revalidateTag('posts');
};

export const editPostAction = async (formData: FormData, postId: number) => {
  const { error } = await editPost(formData, postId);

  if (error) return error;

  revalidateTag('posts');
};

export const deletePostAction = async (postId: number) => {
  const { error } = await deletePost(postId);

  if (error) return error;

  revalidateTag('posts');
  redirect('/');
};
