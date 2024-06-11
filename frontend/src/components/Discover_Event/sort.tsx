import { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface SortProps {
  sort: string;
  handleSortChange: (newSort: string) => void;
}

const SortSection = ({ sort, handleSortChange }: SortProps) => {
  const sortOptions = [
    "Soonest",
    "Latest",
    "Price low to high",
    "Price high to low",
  ];
  const [showSort, setShowSort] = useState(false);
  useEffect(() => {
    console.log("sort changed: ", sort);
  }, [sort]);

  return (
    <div className="relative font-bold">
      <div className="">
        <Button
          onClick={() => setShowSort(!showSort)}
          className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold hover:underline"
        >
          Sort by
        </Button>
        {showSort && (
          <ScrollArea className="h-24 border-none mx-5">
            {sortOptions.map((opt, _) => (
              <div key={opt}>
                <input
                  type="radio"
                  name="category"
                  id={opt}
                  value={opt}
                  checked={opt == sort ? true : false}
                  onChange={(event) => handleSortChange(event.target.value)}
                />
                <label className="font-bold p-2" htmlFor={opt}>
                  {opt}
                </label>
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
export default SortSection;
