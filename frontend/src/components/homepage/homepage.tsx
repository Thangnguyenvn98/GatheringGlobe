import Timer from "./Timer";
import { Separator } from "../ui/separator";
import Testimonials from "./Testimonials";
import Events from "./events";
import EventList from "./EventList";

const Homepage = () => {
  return (
    <div className="flex flex-col w-full mb-10 ">
      <Events />
      <Separator orientation="horizontal" className="mb-10 mt-10" />
      <div>
        <EventList />
      </div>
      <Separator orientation="horizontal" className="mb-10 mt-10" />
      <div>
        <Timer />
      </div>
      <Separator orientation="horizontal" className="mb-10 mt-10" />
      <div>
        <Testimonials />
      </div>
    </div>
  );
};
export default Homepage;
