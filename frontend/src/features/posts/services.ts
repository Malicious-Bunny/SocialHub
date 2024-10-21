import { TComment, TCreateCommentCommand, TPost } from '@/features/posts';
import { api } from '@/lib/api';

export const getPost = async (postId: number) => {
  return await api<TPost>(`posts/${postId}`);
};

export const getPosts = async () => {
  return await api<TPost[]>('posts', { next: { tags: ['posts'] } });
};

export const getComments = async (postId: number) => {
  return await api<TComment[]>(`comments?postId=${postId}`, {
    next: { tags: [`comments/${postId}`] },
  });
};

export const createComment = async (body: TCreateCommentCommand) => {
  return await api('comments', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createPost = async (formData: FormData) => {
  return await api('posts', {
    method: 'POST',
    body: formData,
  });
};

export const editPost = async (formData: FormData, postId: number) => {
  return await api(`posts/${postId}`, {
    method: 'PATCH',
    body: formData,
  });
};

export const deletePost = async (postId: number) => {
  return await api(`posts/${postId}`, {
    method: 'DELETE',
  });
};

export const addLike = async (postId: number) => {
  return await api(`likes/${postId}`, { method: 'POST' });
};

export const deleteLike = async (postId: number) => {
  return await api(`likes/${postId}`, { method: 'DELETE' });
};
