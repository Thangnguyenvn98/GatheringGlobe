import express, { Request, Response } from "express";
import { botMessageArraySchema } from "../validators/botMessage";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "../types/openai-stream";
import { chatbotPrompt } from "../utils/constants/chatbot-prompt";
import rateLimitMiddleware from "../middleware/rateLimit";

const router = express.Router();

router.post("/", rateLimitMiddleware, async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    // Validate and parse the incoming messages
    const parsedMessages = botMessageArraySchema.parse(messages);

    // Prepare the outbound messages
    const outboundMessages: ChatGPTMessage[] = parsedMessages.map(
      (message) => ({
        role: message.isUserMessage ? "user" : "system",
        content: message.message,
      })
    );

    // Add the initial system message with the chatbot prompt
    outboundMessages.unshift({
      role: "system",
      content: chatbotPrompt,
    });

    // Prepare the payload for OpenAI stream
    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: outboundMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 150,
      stream: true,
      n: 1,
    };

    // Get the stream from OpenAI
    const stream = await OpenAIStream(payload);
    console.log(typeof stream);
    res.status(200).send(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
