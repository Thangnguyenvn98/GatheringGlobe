import { Link } from "react-router-dom";
import { CircleArrowRight } from "lucide-react";
import Celebrating from "../../images/Celebrating-end-about.jpg";

const AboutEndingSection = () => {
  return (
    <section className="max-w-screen-lg mx-auto p-10 w-full">
      <div className="grid grid-cols-2">
        <div
          className="flex text-white font-bold text-2xl justify-center items-center bg-no-repeat bg-center"
          style={{
            backgroundImage: `url("${Celebrating}")`,
            backgroundSize: "cover",
            height: "400px",
          }}
        >
          {/* If you need to display text over the image, place it here */}
          <h2>READY TO GET STARTED?</h2>
        </div>
        <div className="flex bg-black items-center justify-center">
          {/* Right column content or image here */}
          <div className="flex items-center justify-center gap-x-4 w-[395px] h-[395px] rounded-[50%] bg-white">
            <h2 className="text-black text-lg">Find your next events</h2>
            <Link to="/">
              <CircleArrowRight fill="white" size={50} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEndingSection;
