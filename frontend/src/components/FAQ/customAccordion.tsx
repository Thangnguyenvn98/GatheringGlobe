import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface customAccordionProps {
  question: string;
  answer: string;
  expanded: boolean;
  setExpanded: () => void;
}

const CustomAccordion: React.FC<customAccordionProps> = ({
  question,
  answer,
  expanded,
  setExpanded,
}) => {
  return (
    <div className="pt-4 border-b-2 border-black">
      <Button
        className="flex justify-between shadow-none  items-center w-full text-black bg-transparent hover:bg-transparent p-0 transition-colors duration-300 ease-in-out "
        onClick={setExpanded}
      >
        <span className="text-2xl">{question}</span>
        <Plus
          className={`transform transition-transform duration-300 ${expanded ? "rotate-45" : "rotate-0"}`}
        />
      </Button>

      <div
        className={` transition-all duration-600 ease-out grid py-4 grid-rows-[0fr] ${expanded ? "grid-rows-[1fr] " : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden text-muted-foreground  ">{answer}</div>
      </div>
    </div>
  );
};

export default CustomAccordion;
