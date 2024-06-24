import { useState } from "react";

import StarBackground from "../../images/starFAQ.jpg";

import CustomAccordion from "./customAccordion";
import {
  CircleUserRound,
  ReceiptText,
  TicketCheck,
  Handshake,
  BellRing,
  Receipt,
} from "lucide-react";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const Faq = () => {
  const [triggers, setTriggers] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    seventh: false,
    eighth: false,
    ninth: false,
    tenth: false,
  });
  const toggleTrigger = (key: keyof typeof triggers) => {
    setTriggers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="flex flex-col bg-white">
      <div
        style={{
          backgroundImage: `url("${StarBackground}")`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        className="flex justify-center items-center min-h-[600px] w-full"
      >
        <div className="flex flex-col text-white items-center text-2xl font-bold ">
          <h2>We're here for you</h2>
          <h1 className="font-extrabold text-8xl text-white">
            Welcome to Online Support
          </h1>
        </div>
      </div>

      <div className="flex flex-col self-center my-10  ">
        <h1 className="text-4xl text-center font-bold">Categories</h1>
        <div className="p-4 ">
          <div className="grid grid-cols-3 gap-4">
            <CategoryCard
              category="My Account"
              description="Manage your account settings, update your profile, and handle your data preferences."
              link="Learn more"
              Icon={CircleUserRound}
            />
            <CategoryCard
              category="My Orders"
              description="Get support for issues related to your ticket purchases and other order details?"
              link="Learn more"
              Icon={ReceiptText}
            />
            <CategoryCard
              category="My Sales"
              description="Access tools and tips for managing the events you are hosting and tracking sales performance."
              link="Learn more"
              Icon={Receipt}
            />
            <CategoryCard
              category="Community"
              description="Join discussions, connect with other event organizers, and share insights in our community."
              link="Learn more"
              Icon={Handshake}
            />
            <CategoryCard
              category="My Events"
              description="Create, manage, and view upcoming and past events that you have organized."
              link="Learn more"
              Icon={TicketCheck}
            />
            <CategoryCard
              category="Event Updates"
              description="Receive the latest updates and alerts about events you're attending or interested in."
              link="Learn more"
              Icon={BellRing}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col m-10 p-4">
        <h1 className="text-4xl text-center font-bold">
          Frequently Asked Questions{" "}
        </h1>
        <div className="w-full max-w-screen-lg mx-auto 2xl:max-w-screen-2xl ">
          <CustomAccordion
            question="How do I create an event on the platform?"
            answer={`To create an event, log in to your account, and navigate to the 'Create Event' section. Fill out the event details form, including event name, date, location, and description. You can also upload images and set ticket prices. Once you've reviewed your details, submit the form to publish your event.`}
            expanded={triggers.first}
            setExpanded={() => toggleTrigger("first")}
          />
          <CustomAccordion
            question="What types of events can I host?"
            answer={`Our platform supports a wide range of events, including concerts, workshops, seminars, conferences, and private parties. If your event type isn't listed, contact us, and we'll make accommodations to suit your needs.`}
            expanded={triggers.second}
            setExpanded={() => toggleTrigger("second")}
          />
          <CustomAccordion
            question="How do attendees reserve tickets?"
            answer={`Attendees can browse the Events page, select an event they are interested in, and proceed to the ticket selection page. From there, they can choose the number of tickets and complete the reservation process by providing attendee information and payment (if required).`}
            expanded={triggers.third}
            setExpanded={() => toggleTrigger("third")}
          />
          <CustomAccordion
            question="Is there a limit on the number of tickets I can sell?"
            answer={`No, there is no set limit on the number of tickets you can sell. However, you can specify a maximum number of tickets per event based on the venue capacity or your preference.`}
            expanded={triggers.fourth}
            setExpanded={() => toggleTrigger("fourth")}
          />
          <CustomAccordion
            question="Can I cancel or reschedule an event after it’s been created?"
            answer={`Yes, you can cancel or reschedule events by accessing the event management section of your dashboard. Please note that any changes should be communicated to registered attendees as soon as possible to ensure convenience and maintain trust.`}
            expanded={triggers.fifth}
            setExpanded={() => toggleTrigger("fifth")}
          />
          <CustomAccordion
            question="What support options are available if I encounter issues?"
            answer={`Our support team is available 24/7 via email, phone, and live chat. You can also access our comprehensive help center for articles, video tutorials, and more to help you navigate any aspect of our platform.`}
            expanded={triggers.sixth}
            setExpanded={() => toggleTrigger("sixth")}
          />
          <CustomAccordion
            question="How do I promote my event through the platform?"
            answer={`You can use our built-in promotional tools to boost your event's visibility. Options include featured listings, promotional emails, and social media integration. For more extensive campaigns, contact our marketing team for tailored solutions.`}
            expanded={triggers.seventh}
            setExpanded={() => toggleTrigger("seventh")}
          />
          <CustomAccordion
            question="What payment methods are accepted for ticket sales?"
            answer={`We accept various payment methods including credit cards, PayPal, and direct bank transfers. All transactions are secured with advanced encryption to ensure your financial safety.`}
            expanded={triggers.eighth}
            setExpanded={() => toggleTrigger("eighth")}
          />
          <CustomAccordion
            question="How do I manage attendee lists and check-ins?"
            answer={`You can manage your attendee lists and check-ins directly from your dashboard. Use our mobile app for real-time attendee tracking and on-site check-ins through QR codes or manual entry.`}
            expanded={triggers.ninth}
            setExpanded={() => toggleTrigger("ninth")}
          />
          <CustomAccordion
            question="Can I offer free tickets or coupons for my event?"
            answer={`Yes, you can offer free tickets or create discount codes for promotional purposes. During the event setup process, you have the option to specify ticket prices, including free tickets, or apply discounts.`}
            expanded={triggers.tenth}
            setExpanded={() => toggleTrigger("tenth")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 pb-10 items-center">
        <h2 className="text-2xl font-bold">FIND SUPPORT</h2>

        <Link
          to="/contact-us"
          className="bg-black text-white p-4 rounded-md hover:bg-opacity-80 min-w-[150px] max-h-[100px] text-center"
        >
          Contact us &#x2192;{" "}
        </Link>
      </div>
    </div>
  );
};

export default Faq;
