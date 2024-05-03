import AboutBanner from "../../images/about-banner(1).jpg";
import StatsComponent from "./statsComponent";
import ServicesComponent from "./servicesComponent";
import FeaturesComponent from "./featuresComponent";
import AboutEndingSection from "./endingSection";
import OurStory from "./ourStory";

const AboutUs = () => {
  return (
    <div className="flex flex-col">
      <div
        style={{
          backgroundImage: `url("${AboutBanner}")`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",

        }}
        className="flex justify-center items-center min-h-[600px] w-full"
      >
        <h1 className="font-extrabold text-4xl text-white">
          We're in the business of making memories.
        </h1>
      </div>
      <OurStory />
      <StatsComponent />
      <ServicesComponent />
      <FeaturesComponent />
      <AboutEndingSection />
    </div>
  );
};

export default AboutUs;
