import { z } from 'zod';

export const defaultValues = {
  content: '',
};

export const createPostFormSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export type TCreatePostFormSchema = z.infer<typeof createPostFormSchema>;
