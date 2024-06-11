// import { cn } from "@/lib/utils";
// import { FC, HTMLAttributes, useState } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import { nanoid } from "nanoid";
// import { useSendChatBotMessage } from "@/services/useMutation";
// import { ChatBotUserMessage } from "@/types/chatBotUserMessage";

// interface BotChatInputProps extends HTMLAttributes<HTMLDivElement> {}

// const BotChatInput: FC<BotChatInputProps> = ({ className, ...props }) => {
//   const [input, setInput] = useState("");
//   const sendBotMessage = useSendChatBotMessage();

//   return (
//     <div {...props} className={cn("border-t border-zinc-300", className)}>
//       <TextareaAutosize
//         rows={2}
//         maxRows={4}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             const message: ChatBotUserMessage = {
//               id: nanoid(),
//               isUserMessage: true,
//               message: input,
//             };
//             sendBotMessage.mutate(message);
//           }
//         }}
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         autoFocus
//         placeholder="Write a message ..."
//         className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
//       />
//     </div>
//   );
// };

// export default BotChatInput;
