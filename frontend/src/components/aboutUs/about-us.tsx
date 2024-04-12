import AboutBanner from "../../images/about-banner(1).jpg";
import StatsComponent from "./statsComponent";
import ServicesComponent from "./servicesComponent";
import FeaturesComponent from "./featuresComponent";
import AboutEndingSection from "./endingSection";
import OurStory from "./ourStory";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        style={{
          backgroundImage: `url("${AboutBanner}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex justify-center items-center h-[400px]"
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
