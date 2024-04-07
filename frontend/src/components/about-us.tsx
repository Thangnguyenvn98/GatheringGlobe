import { Link } from 'react-router-dom'
import AboutBanner from '../images/about-banner(1).jpg'
import Megaphone from '../images/announcement-speaker.jpg'
import Celebrating from '../images/Celebrating-end-about.jpg'
import { CircleArrowRight, MicVocal, PartyPopper, TicketCheck } from 'lucide-react'
const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <div style={{backgroundImage: `url("${AboutBanner}")` }} className="flex justify-center items-center h-[400px]" >
            <h1 className="font-extrabold text-4xl text-white">We're in the business of making memories.</h1>
        </div>
        <div className="flex justify-center mt-10">
        <div className="flex flex-col p-10 max-w-screen-lg w-full">
          {/* First grid section */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-4">
              <h3 className="font-bold text-xl text-emerald-400">OUR STORY</h3>
              <h1 className="font-bold text-2xl">Our Commitment to Excellence in Event Management</h1>
          </div>
          <div className="text-wrap text-sm">
              <p>We are a team of experienced professionals with a passion for creating seamless and unforgettable events. Our event platform is designed to simplify event planning and execution, allowing you to focus on what matters most: creating meaningful experiences for your guests.
              </p>
              <br/>
              <p>At our core, we are committed to providing exceptional customer service and support. Our team is always available to answer any questions and provide guidance throughout the planning process. We pride ourselves on being reliable, trustworthy, and dedicated to making your event a success.Thank you for considering our event management app for your next event. We look forward to working with you and bringing your vision to life.</p>
          </div>
          </div>
          </div>
          </div>
               {/* Stats sections prototype */}
               <div className="flex justify-center bg-slate-950 p-4">
              <div className="flex flex-col p-2">
              <h1 className="text-4xl font-bold text-white mt-4 text-center">Live experiences hold the keys to happiness.</h1>
              <div className="grid grid-cols-3 gap-x-4 text-emerald-400 mt-4">
                    <div className="flex flex-col gap-y-4 text-center">
                      <h1 className="font-bold text-6xl">62%</h1>
                      <p className="text-white">of people say that attending a concert would make them happy.</p>
                    </div>
                    <div className="flex flex-col gap-y-4 text-center">
                      <h1 className="font-bold text-6xl">
                          75%
                      </h1>
                      <p className="text-white">of people say making memories is the best part of attending a live event.</p>
                    </div>
                    <div className="flex flex-col gap-y-4 text-center">
                      <h1 className="font-bold text-6xl">53%</h1>
                      <p className="text-white">of people say getting hard-to-get tickets to a concert would be most impressive on a date.</p>
                    </div>
              </div>
              </div>
          </div>
          
          <div className="flex justify-center mt-10">

          <div className="flex flex-col p-10 max-w-screen-lg w-full">

          {/* Second Grid Sections for Stats */}
          <section className="p-4">
            <h2 className="text-center font-bold text-2xl text-emerald-400">
            Above and beyond our guarantee, we offer:

            </h2>
          <div className="grid grid-cols-3 mt-10 gap-10">
            <div className="flex flex-col items-center text-center text-sm gap-y-4 ">
              <h2 className="font-bold text-sm">Experience you're looking for.</h2>
              <MicVocal size={60} fill="grey"/>
              <p >There’s no reason to miss out. With tickets to millions of events, and tools like Price Alert to help you stay within budget, we have the ticket that’s right for you.</p>
            </div>

            <div className="flex flex-col items-center text-center text-sm gap-y-4">
            <h2 className="font-bold text-sm">Service and a history you can trust.</h2>
            <TicketCheck size={60}/>
            <p >
            You can buy and sell with 100% confidence. With more than 130 trusted partners, award-winning customer service and a convenient, feature-packed mobile app to buy and sell anytime, anywhere, we’ve got you covered.
            </p>
            </div>

            <div className="flex flex-col items-center text-center text-sm gap-y-4">
            <h2 className="font-bold text-sm">So much more.</h2>
            <PartyPopper size={60} />
            <p >
            The ticket is just the beginning! Loyalty perks for our top buyers, personalized recommendations and surprise seat upgrades are just a few of the ways we give fans more than just the ticket.
            </p>
            </div>

          </div>
          </section>
          </div>
          </div>

          <div className="flex justify-center mt-10">

        <div className="flex flex-col p-10 max-w-screen-lg w-full">

        {/* 3rd Sections */}
        <section className="p-4">
          <div className="grid gap-x-10" style={{gridTemplateColumns: '38% 62%'}}>
             <div className="flex flex-col space-y-4">
              <h3 className="font-bold text-xl text-emerald-400">THE DIFFERENCE</h3>
              <h1 className="font-bold text-2xl ">What Makes Us Stand Out</h1>
              <img src={Megaphone} alt="megaphone"/>
            </div>
              <div className="grid grid-cols-2 auto-rows-auto gap-4">
                  <div className="flex flex-col p-2 gap-y-4">
                    <h2 className="font-bold text-2xl">Collaborate for seamless events</h2>
                    <p>At GatheringGlobe, we understand the importance of teamwork in achieving a successful event. That's why we prioritize working together with you to make your vision a reality.</p>

                  </div>
                  <div className="flex flex-col  p-2 gap-y-4">
                    <h2 className="font-bold text-2xl">Transparency builds trust</h2>
                    <p>Clear communication and transparency are essential to building trust. We committed to being upfront with our pricing, services so that you can make informed decisions.</p>

                  </div>
                  <div className="flex flex-col  p-2 gap-y-4">
                    <h2 className="font-bold text-2xl">Goal and results obsessed</h2>
                    <p>At GatheringGlobe, we're driven by results. Creating an unforgettable experience, or delivering a flawless execution, we're obsessed with achieving the best possible outcome for you.</p>

                  </div>
                  <div className="flex flex-col  p-2 gap-y-4">
                    <h2 className="font-bold text-2xl">Better today than yesterday</h2>
                    <p>We know that every event is unique, and we're always striving to learn and improve from each one. At GatheringGlobe, we believe in being better today than yesterday.</p>

                  </div>
              </div>
          </div>
        </section>
    

          </div>
          </div>
          
        
       
            {/* Ending section */}
      <section className="max-w-screen-lg mx-auto p-10 w-full">
      <div className="grid grid-cols-2">
        <div className="flex text-white font-bold text-2xl justify-center items-center bg-no-repeat bg-center" style={{ backgroundImage: `url("${Celebrating}")`, backgroundSize: 'cover', height: '400px' }}>
      {/* If you need to display text over the image, place it here */}
         <h2>READY TO GET STARTED?</h2>
        </div>
    <div className="flex bg-black items-center justify-center">
      {/* Right column content or image here */}
      <div className="flex items-center justify-center gap-x-4 w-[395px] h-[395px] rounded-[50%] bg-white">
        <h2 className="text-black text-lg">Find your next events</h2>
        <div>
        <CircleArrowRight fill="white" size={50} />
        </div>
      </div>
     
      
    </div>
  </div>
          </section>
        </div>
       
    
  )
}

export default AboutUs