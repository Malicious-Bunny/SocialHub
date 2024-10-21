export type TConversation = {
  id: number;
  participants: { username: string; image: string }[];
  messages: TMessage[];
  createdAt: number;
};

export type TMessage = {
  id: number;
  content: string;
  senderId: number;
  sender: { username: string; image: string };
  createdAt: number;
};
