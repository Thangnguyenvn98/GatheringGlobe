import { Check } from "lucide-react";

export const VerifiedMark = () => {
  return (
    <div className="p-0.5 flex items-center h-4 w-4 justify-center bg-blue-600 rounded-full">
      <Check className="h-[10px] stroke-[4px] w-[10px] text-white " />
    </div>
  );
};
