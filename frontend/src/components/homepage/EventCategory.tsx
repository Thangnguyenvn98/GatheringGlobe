import {
  PiMicrophoneStageLight,
  PiMaskHappy,
  PiSoccerBallLight,
  PiBarbell,
  PiDiscoBallThin,
} from "react-icons/pi";
import { IoGameControllerOutline, IoFastFoodOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Music",
    icon: <PiMicrophoneStageLight className="h-10 w-10" />,
  },
  {
    title: "Comedy",
    icon: <PiMaskHappy className="h-10 w-10" />,
  },
  {
    title: "Entertainment",
    icon: <IoGameControllerOutline className="h-10 w-10" />,
  },
  {
    title: "Food and Drink",
    icon: <IoFastFoodOutline className="h-10 w-10" />,
  },
  {
    title: "Sports",
    icon: <PiSoccerBallLight className="h-10 w-10" />,
  },
  {
    title: "Education",
    icon: <SlBookOpen className="h-10 w-10" />,
  },
  {
    title: "Fitness",
    icon: <PiBarbell className="h-10 w-10" />,
  },
  {
    title: "Nightlife",
    icon: <PiDiscoBallThin className="h-10 w-10" />,
  },
];

const EventCategory = () => {
  const navigate = useNavigate();
  const onSearchCategory = (category: string) => {
    navigate(`/discover?category=${category}`);
  };
  return (
    <div className="mx-10">
      <div className="flex justify-center items-center gap-x-10">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              key={index}
              onClick={() => onSearchCategory(category.title)}
              className="flex items-center justify-center w-24 h-24 border-2 border-gray-200 rounded-full p-4"
            >
              {category.icon}
            </button>
            <p className="text-sm mt-2">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCategory;
