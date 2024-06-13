import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import BotChatHeader from "./BotChatHeader";
import BotChatInput from "./BotChatInput";
import BotChatMessages from "./BotChatMessages";

const BotChat = () => {
  return (
    <div className="bg-black">
      <Accordion
        type="single"
        collapsible
        className="relative bg-slate-400 z-40 shadow"
      >
        <AccordionItem value="item-1">
          <div>
            <div className="fixed right-8 w-80 bottom-8 bg-white-border border-gray-200 rounded-md overflow-hidden">
              <div className="w-full h-full flex flex-col">
                <AccordionTrigger className="px-6 border-b border-zinc-300">
                  <BotChatHeader />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col h-80">
                    <BotChatMessages className="px-2 py-3 flex-1" />
                    <BotChatInput className="px-2" />
                  </div>
                </AccordionContent>
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BotChat;
