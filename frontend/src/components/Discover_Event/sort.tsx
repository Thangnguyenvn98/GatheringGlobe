import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const SortSection = () => {
  const sortOptions = [
    "Soonest",
    "Latest",
    "Price low to high",
    "Price high to low",
  ];
  let [searchParams, setSearchParams] = useSearchParams();

  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    console.log("sort changed");
    if (sort) {
      searchParams.set("sort", sort);
    } else {
      searchParams.delete("sort");
    }
    setSearchParams(searchParams);
  }, [sort]);

  return (
    <div className="relative font-bold hidden md:flex flex-col items-start">
      {showSort ? (
        <Button
          onClick={() => setShowSort(!showSort)}
          className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold hover:underline"
        >
          Sort by &#x25B4;
        </Button>
      ) : (
        <Button
          onClick={() => setShowSort(!showSort)}
          className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold hover:underline"
        >
          Sort by &#x25BE;
        </Button>
      )}
      {showSort &&
        sortOptions.map((sortOption, _) => (
          <div key={sortOption} className="">
            <input
              className=""
              type="radio"
              name="sortegory"
              id={sortOption}
              value={sortOption}
              checked={sortOption === sort}
              onChange={(event) => setSort(event.target.value)}
            />
            <label className="font-light p-2" htmlFor={sortOption}>
              {sortOption}
            </label>
          </div>
        ))}
    </div>
  );
};
export default SortSection;
