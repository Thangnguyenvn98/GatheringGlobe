import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  message: z.string(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type ChatBotUserMessage = z.infer<typeof MessageSchema>;
