const OurStory = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col p-10 max-w-screen-lg w-full">
        {/* First grid section */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-xl text-emerald-400">OUR STORY</h3>
            <h1 className="font-bold text-2xl">
              Our Commitment to Excellence in Event Management
            </h1>
          </div>
          <div className="text-wrap text-sm">
            <p>
              We are a team of experienced professionals with a passion for
              creating seamless and unforgettable events. Our event platform is
              designed to simplify event planning and execution, allowing you to
              focus on what matters most: creating meaningful experiences for
              your guests.
            </p>
            <br />
            <p>
              At our core, we are committed to providing exceptional customer
              service and support. Our team is always available to answer any
              questions and provide guidance throughout the planning process. We
              pride ourselves on being reliable, trustworthy, and dedicated to
              making your event a success.Thank you for considering our event
              management app for your next event. We look forward to working
              with you and bringing your vision to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
