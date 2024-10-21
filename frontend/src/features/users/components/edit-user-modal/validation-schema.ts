import { z } from 'zod';

export const editUserModalSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(5, 'Username is too short')
    .max(30, 'Username is too long'),
  bio: z.string(),
});

export type TEditUserModalSchema = z.infer<typeof editUserModalSchema>;
