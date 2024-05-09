import Megaphone from "../../images/announcement-speaker.jpg";
const FeaturesComponent = () => {
  const features = [
    {
      title: "Collaborate for seamless events",
      text: "At GatheringGlobe, we understand the importance of teamwork in achieving a successful event. That's why we prioritize working together with you to make your vision a reality.",
    },
    {
      title: "Transparency builds trust",
      text: "Clear communication and transparency are essential to building trust. We committed to being upfront with our pricing, services so that you can make informed decisions.",
    },
    {
      title: "Goal and results obsessed",
      text: "At GatheringGlobe, we're driven by results. Creating an unforgettable experience, or delivering a flawless execution, we're obsessed with achieving the best possible outcome for you.",
    },
    {
      title: "Better today than yesterday",
      text: "We know that every event is unique, and we're always striving to learn and improve from each one. At GatheringGlobe, we believe in being better today than yesterday.",
    },
  ];
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col p-10 max-w-screen-lg w-full">
        <section className="p-4">
          <div
            className="grid gap-x-10"
            style={{ gridTemplateColumns: "38% 62%" }}
          >
            <div className="flex flex-col space-y-4">
              <h3 className="font-bold text-xl text-emerald-400">
                THE DIFFERENCE
              </h3>
              <h1 className="font-bold text-2xl ">What Makes Us Stand Out</h1>
              <img src={Megaphone} alt="megaphone" />
            </div>
            <div className="grid grid-cols-2 auto-rows-auto gap-4">
              {features.map((feature, index) => (
                <div className="flex flex-col p-2 gap-y-4" key={index}>
                  <h2 className="font-bold text-2xl">{feature.title}</h2>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturesComponent;
