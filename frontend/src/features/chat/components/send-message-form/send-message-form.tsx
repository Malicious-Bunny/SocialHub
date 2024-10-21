'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Icons,
  Input,
} from '@/components';

export const defaultValues = {
  content: '',
};

export const sendMessageFormSchema = z.object({
  content: z.string().min(1),
});

export type TSendMessageFormSchema = z.infer<typeof sendMessageFormSchema>;

export const SendMessageForm = () => {
  const form = useForm<TSendMessageFormSchema>({
    resolver: zodResolver(sendMessageFormSchema),
    defaultValues,
  });

  const onSubmit = () => {
    console.log('SendMessageForm');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-row gap-2 px-4 py-3 md:pb-8 md:pt-5"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Send message" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="ghost" size="icon">
          <Icons.sendHorizontal className="text-primary" />
        </Button>
      </form>
    </Form>
  );
};
