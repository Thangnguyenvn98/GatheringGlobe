import DiversityInclusion from "../../images/diversity_inclusion1.jpg";
import SportDay from "../../images/sport-day.jpg";
import NightMarket from "../../images/night-market.jpg";
import NightFair from "../../images/night-fair.jpg";
import City from "../../images/city.jpg";
import OfficeParty from "../../images/office-party.jpg";
import ChatHand from "../../images/chat-hand.jpg";
import { useEffect, useRef, useState } from "react";

const images = [
  DiversityInclusion,
  SportDay,
  NightMarket,
  NightFair,
  City,
  OfficeParty,
  ChatHand,
];

function Events() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    }, 2500);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="whitespace-nowrap ease-in-out"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full inline-block 2xl:h-[700px] md:h-[300px] relative"
          >
            <img
              src={image}
              alt="event"
              className="w-full 2xl:h-[700px] md:h-[300px] object-fill"
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        {images.map((_, idx) => (
          <div
            onClick={() => {
              setIndex(idx);
            }}
            key={idx}
            className={`inline-block h-6 w-6 rounded-xl cursor-pointer  ml-4 mr-2 mt-10 ${index === idx ? "bg-green-300" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Events;
