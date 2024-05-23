import { useState } from "react";
// import Event from "../../../../backend/src/models/event"
// import Ticket from "../../../../backend/src/models/ticket"
import { TicketType } from "@/types/ticket";
import { useLocation } from "react-router-dom"; //to call props in event card to the even detail page by clicking the button "view event details"
// import queryString from "query-string";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function EventDetail() {
  const location = useLocation();
  type EventType = {
    _id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    venueId?: string;
    capacity?: number;
    organizerId: string;
    location: string;
    categories: string[];
    artistName: string;
    imageUrls: string[];
    tickets: TicketType[]; // Reference to ticket IDs
    roomChatLink: string;
  };
  const eventData: any = location.state;
  // const eventId = [
  //   "662f1a933dba20d8d4898a1d",
  //   "662f1ae89677eedbc6237b45",
  //   "663d06e84a6f3a2d49f6f1e7",
  //   "663d9f6231dd3fc1e2ec084b",
  //   "663d9f6231dd3fc1e2ec084a",
  //   "6642ac5bb11b9a61bc1c3714",
  //   "6642d38fd700932d5e4b309c"
  // ];

  const [ticketAmount, setTicketAmount] = useState<number>(1);
  const handleTicketAmountChange = (amount: number) => {
    // Ensure that ticket amount is not less than 1
    setTicketAmount((prev) => Math.max(1, prev + amount));
    console.log(ticketAmount);
  };
  // const onCheckOut = (eventData: EventType) => {
  //   console.log(eventData);
  // };

  // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  //   let eventData = {
  //     "_id": "663d9f6231dd3fc1e2ec084a",
  //     "title": "Summer Music Festival",
  //     "description": "Join us for a day full of music, food, and fun!",
  //     "startTime": "2024-06-21T12:00:00.000Z",
  //     "endTime": "2024-06-21T20:00:00.000Z",
  //     "location": "Central Park, New York",
  //     "categories": [
  //         "Music",
  //         "Festival",
  //         "Outdoor"
  //     ],
  //     "artistName": "DJ Mike",
  //     "imageUrls": [
  //         "https://example.com/images/event1.jpg",
  //         "https://example.com/images/event2.jpg"
  //     ],
  //     "tickets": [
  //         {
  //             "_id": "6642aa182fa21bc4fb8137f7",
  //             "eventId": "663d9f6231dd3fc1e2ec084a",
  //             "price": 25.99,
  //             "status": "Available",
  //             "quantityAvailable": 20,
  //             "type": "General Admission",
  //             "isFree": false,
  //             "__v": 0
  //         },
  //         {
  //             "_id": "6642b197a00aa7599afb1245",
  //             "eventId": "663d9f6231dd3fc1e2ec084a",
  //             "seatNumber": "GA",
  //             "price": 25.99,
  //             "status": "Available",
  //             "quantityAvailable": 200,
  //             "type": "General Admission",
  //             "isFree": false,
  //             "__v": 0
  //         }
  //     ],
  //     "roomChatLink": "https://chat.example.com/summerfest"
  // }
  //   let eventData:EventType = {
  //     _id: "",
  //     title: "",
  //     description: "",
  //     startTime: new Date (),
  //     endTime: new Date (),
  //     venueId: "",
  //     capacity: 0,
  //     organizerId: "",
  //     location: "",
  //     categories: [],
  //     artistName: "",
  //     imageUrls: [],
  //     tickets:[{
  //                   "_id": "",
  //                   "eventId": "",
  //                   "price": 0,
  //                   "status": "",
  //                   "quantityAvailable": 0,
  //                   "type": "",
  //                   "isFree": false,
  //               }],
  //     roomChatLink: ""
  // }
  // async () => {await (async () =>{
  //   try {
  //     //     //axios.get() is a method provided by the Axios library to send a GET request to a specified URL.
  //         const response = await axios.get(
  //           `${API_BASE_URL}/api/events/${eventId[4]}/details`,
  //         );
  //         console.log(`${API_BASE_URL}/api/events/${eventId[4]}/details`)

  //         if (response.status === 200) {
  //           //if the data fetched successfully (status code === 200), navigate to another page
  //           console.log(response.data);
  //           eventData = response.data
  //         } else if (response.status === 404) {
  //           //if no matching event found, we dont do the navigate(...) so that there is no error
  //           console.log("No matching event found");
  //         }
  //       } catch (error) {
  //         console.error("Fail to fetch: ", error);
  //       }
  // }) ();
  // };

  return (
    // <div>Nothing to see here</div>
    <div className="flex flex-col md:flex-row p-6">
      <div className="flex-1">
        <img
          src={eventData.imageUrls[0]}
          alt={eventData.title}
          className="rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{eventData.title}</h1>
        <p className="text-gray-600 mb-2">{eventData.location}</p>
        <p className="text-gray-600 mb-2">{eventData.startTime.toString()}</p>
        <p className="text-gray-600 mb-2">{eventData.endTime.toString()}</p>
        <div className="mb-4">
          {eventData.categories?.map((tag: String) => (
            <span
              key={eventData._id}
              className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2">About this event</h2>
        <p>{eventData.description}</p>
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Tickets</h3>
          <div className="flex items-center mb-4">
            <button
              onClick={() => handleTicketAmountChange(-1)}
              className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-l-md"
              disabled={ticketAmount <= 1}
              aria-label="Decrease ticket amount"
            >
              -
            </button>
            <span className="flex items-center justify-center bg-white text-black mx-2 p-2">
              {ticketAmount}
            </span>
            <button
              onClick={() => handleTicketAmountChange(1)}
              className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-r-md"
              aria-label="Increase ticket amount"
            >
              +
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            {/* <span className="text-gray-800 font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(eventData.tickets?[0].price)}
            </span> */}
            <button
              // onClick={() => onCheckOut(eventData)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
