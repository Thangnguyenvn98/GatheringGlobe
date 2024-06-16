import OpenAI from "openai";
import { Stream } from "openai/streaming";

export type ChatGPTAgent = "user" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

interface AsyncIterableStream<T> extends Stream<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}
const openai = new OpenAI({
  organization: process.env.OPEN_API_ORGANIZATION_ID,
  apiKey: process.env.OPEN_API_KEY,
});

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const stream = (await openai.chat.completions.create(
    payload
  )) as AsyncIterableStream<OpenAI.Chat.Completions.ChatCompletionChunk>;

  let accumulatedContent = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    accumulatedContent += content;
  }

  return accumulatedContent;
}
