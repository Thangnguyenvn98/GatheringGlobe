import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const sections = [
  {
    title: "Gathering Globe",
    items: [
      "Discover, engage, and connect with 'GatheringGlobe,' transforming events into immersive, community-driven experiences that go beyond just ticket sales.",
    ],
  },
  {
    title: "About Us",
    items: [
      { name: "Contact Us", path: "/contact-us" },
      { name: "About Us", path: "/about" },
      { name: "Privacy Policy", path: "/contact-us" },
      { name: "Terms of Use", path: "/help" },
      { name: "Blog", path: "/contact-us" },
      { name: "Careers", path: "/contact-us" },
      { name: "Investors", path: "/contact-us" },
      { name: "Partners", path: "/contact-us" },
      { name: "Sitemap", path: "/contact-us" },
    ],
  },
  {
    title: "Helpful Links",
    items: [
      { name: "Help", path: "/help" },
      { name: "FAQs", path: "/help" },
      { name: "Refunds and Exchanges", path: "/help" },
      { name: "Resale Policy", path: "/help" },
      { name: "Fan Guarantee", path: "/help" },
      { name: "Ticket Your Event", path: "/create-new-event" },
      { name: "Gift Cards", path: "/help" },
      { name: "Buyer Guarantee", path: "/help" },
      { name: "Seller Guarantee", path: "/help" },
      { name: "Event Guidelines", path: "/help" },
    ],
  },
  {
    title: "Popular Events",
    items: [
      "Eras Tour",
      "The Weeknd",
      "The Rolling Stones",
      "The Eagles",
      "The Beatles",
      "The Doors",
      "The Who",
      "The Beach",
    ],
    links: [
      "/discover-event-details",
      "/discover-event-details",
      "/discover-event-details",
      "/discover-event-details",
      "/discover-event-details",
      "/discover-event-details",
      "/discover-event-details",
      "/discover-event-details",
    ],
  },
  {
    title: "Popular Categories",
    items: ["Music", "Sports", "Academic", "Craft", "Health", "Beauty"],
    links: [
      "/discover",
      "/discover",
      "/discover",
      "/discover",
      "/discover",
      "/discover",
      "/discover",
    ],
  },
  {
    title: "Explore",
    items: [
      "See tickets",
      "See events",
      "See events categories",
      "Join Groups",
      "Find friends",
      "Live events",
    ],
    links: [
      "/booking/:ticketId", // Example: needs dynamic ID
      "/booking/:ticketId", // Example: needs dynamic ticket ID
      "/discover",
      "/messages/c/owner123/t/room456", // Example: needs dynamic owner and room IDs
      "/messages",
      "/checkout",
    ],
  },
];

const socialMedia = [
  {
    title: "Facebook",
    Icon: FaFacebook, // Store the component itself, not an instance
    link: "https://www.facebook.com/",
  },
  {
    title: "Instagram",
    Icon: FaInstagram,
    link: "https://www.instagram.com/",
  },
  {
    title: "Twitter",
    Icon: FaTwitter,
    link: "https://twitter.com/",
  },
  {
    title: "LinkedIn",
    Icon: FaLinkedin,
    link: "https://www.linkedin.com/",
  },
  {
    title: "YouTube",
    Icon: FaYoutube,
    link: "https://www.youtube.com/",
  },
];

function Footer() {
  return (
    <div className="footer-container">
      <div className=" w-full mt-12 text-gray-200 px-4 pb-4 pt-3">
        <div className="footer-data border-b border-gray-700 pb-6 grid grid-cols-6 gap-2 pl-6">
          {sections.map((section, index) => (
            <div className="pt-2 pl-6" key={index}>
              <h3 className="font-bold uppercase pb-4 text-neutral-700 text-xl">
                {section.title}
              </h3>
              <ul className="list-disc mx-auto">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="py-1 font-medium  hover:text-black hover:underline  hover:underline-offset-4 cursor-pointer"
                  >
                    <Link to={typeof item === "string" ? item : item.path}>
                      {typeof item === "string" ? item : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className=" copyright-container flex flex-wrap items-center justify-between w-full  ">
        <div className="flex-1 min-w-[300px] text-center">
          <p className="font-medium pl-8 py-4 text-neutral-700">
            © 2024 Gathering Globe. All Rights Reserved by Gathering Globe
            Contributors Team.
          </p>
        </div>
        <div className="social-media-container flex flex-1 min-w-[300px] pb-4 text-bold justify-center pt-4 text-2xl">
          {" "}
          {socialMedia.map((social, index) => {
            const Icon = social.Icon; // Accessing the component reference
            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black hover:underline  hover:underline-offset-4 cursor-pointer mx-2" // Added horizontal margin for spacing between icons
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Footer;
