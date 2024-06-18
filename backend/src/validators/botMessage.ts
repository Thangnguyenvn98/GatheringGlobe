import * as z from "zod";

export const botMessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  message: z.string(),
});

export const botMessageArraySchema = z.array(botMessageSchema);

export type botMessage = z.infer<typeof botMessageSchema>;
