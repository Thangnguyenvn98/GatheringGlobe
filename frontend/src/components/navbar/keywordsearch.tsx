import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchByKeywordProps {
  setKeywordFromParent: (value: string) => void;
  onSubmit: () => void;
}

function SearchByKeyword({
  setKeywordFromParent,
  onSubmit,
}: SearchByKeywordProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="relative flex items-center ml-1 w-[400px]">
      <Search className="absolute left-2 h-6 w-6 " />
      <Input
        className="w-full pl-10 rounded-sm  text-lg h-auto text-green-800 focus-visible:ring-border-red-500 border-none  placeholder:text-muted-foreground"
        placeholder="Search by Artist, Event or Venue"
        onChange={(e) => setKeywordFromParent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchByKeyword;
