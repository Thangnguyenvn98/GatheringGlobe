import React from "react";
import EventCard from "../shared/EventCard"; // Import the EventCard component
import "./EventList.css";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Pagination from "./Pagination";

interface EventListProps {
  displayMode: string;
}

const EventList: React.FC<EventListProps> = ({ displayMode }) => {
  const navigate = useNavigate();
  const events = [
    {
      id: "1",
      title: "Summer Music Festival",
      description: "Join us for an amazing day of music and fun!",
      startTime: "2021-08-01T12:00:00Z",
      endTime: "2021-08-01T22:00:00Z",
      artistName: "DJ Example",
      imageUrls: ["https://st.cdjapan.co.jp/pictures/l/02/45/AVXK-79993.jpg"],
      location: "Downtown Park",
    },
    {
      id: "2",
      title: "Local Art Exhibition",
      description: "Experience stunning artworks from local artists.",
      startTime: "2021-08-05T09:00:00Z",
      endTime: "2021-08-05T18:00:00Z",
      artistName: "Art Collective",
      imageUrls: ["https://i.redd.it/g0n1v1x4sgub1.jpg"],
      location: "City Art Gallery",
    },
    {
      id: "3",
      title: "Summer Music Festival",
      description: "Join us for an amazing day of music and fun!",
      startTime: "2021-08-01T12:00:00Z",
      endTime: "2021-08-01T22:00:00Z",
      artistName: "DJ Example",
      imageUrls: [
        "https://m.media-amazon.com/images/I/61k0T9RskvL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg",
      ],
      location: "Downtown Park",
    },
    {
      id: "4",
      title: "Summer Music Festival",
      description: "Join us for an amazing day of music and fun!",
      startTime: "2021-08-01T12:00:00Z",
      endTime: "2021-08-01T22:00:00Z",
      artistName: "DJ Example",
      imageUrls: [
        "https://res.cloudinary.com/teepublic/image/private/s--NXA0XhbD--/c_crop,x_10,y_10/c_fit,h_1109/c_crop,g_north_west,h_1260,w_1260,x_-157,y_-76/co_rgb:000000,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-157,y_-76/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1254,w_1254/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1696773811/production/designs/51574983_0.jpg",
      ],
      location: "Downtown Park",
    },
    {
      id: "5",
      title: "Summer Music Festival",
      description: "Join us for an amazing day of music and fun!",
      startTime: "2021-08-01T12:00:00Z",
      endTime: "2021-08-01T22:00:00Z",
      artistName: "DJ Example",
      imageUrls: [
        "https://m.media-amazon.com/images/M/MV5BMGQyNmY3ZGItM2RhNS00ZGQyLTgwNDktNTY0YzYwNGVkZjU2XkEyXkFqcGdeQXVyNjM0MTI4Mw@@._V1_.jpg",
      ],
      location: "Downtown Park",
    },
    {
      id: "6",
      title: "Summer Music Festival",
      description: "Join us for an amazing day of music and fun!",
      startTime: "2021-08-01T12:00:00Z",
      endTime: "2021-08-01T22:00:00Z",
      artistName: "DJ Example",
      imageUrls: ["https://pbs.twimg.com/media/FBFVHNzVEAo0uJ9.jpg"],
      location: "Downtown Park",
    },
  ];
  const gridStyle = {
    display: displayMode === "grid" ? "grid" : "block",
    gridTemplateColumns: displayMode === "grid" ? "repeat(3, 1fr)" : "none",
    gap: displayMode === "grid" ? "20px" : "0",
    paddingLeft: "50px",
    paddingRight: "50px",
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("here", e.target);
    navigate("/discover-event-details");
  };

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      <div
        className="grid place-items-center h-screen p-4 pb-5"
        style={gridStyle}
        onClick={handleClick}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            startTime={event.startTime}
            endTime={event.endTime}
            artistName={event.artistName}
            imageUrls={event.imageUrls}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
