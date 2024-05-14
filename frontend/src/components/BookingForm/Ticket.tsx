// TicketList.jsx
import { Link } from "react-router-dom";

const Ticket = () => {
  const tickets = [
    {
      id: "1",
      name: "Concert of The Year",
      description:
        "Experience the ultimate concert with top artists from around the world.",
      price: "50",
    },
    {
      id: "2",
      name: "Tech Conference 2024",
      description:
        "Join leading experts in the tech industry to discuss the future of technology.",
      price: "200",
    },
    {
      id: "3",
      name: "Local Food Festival",
      description:
        "Discover and taste the best local dishes prepared by renowned chefs.",
      price: "30",
    },
    {
      id: "4",
      name: "Marathon 2024",
      description:
        "Participate in the annual city marathon and run for a cause.",
      price: "25",
    },
    {
      id: "5",
      name: "Art Exhibition: Modernism",
      description:
        "Explore an exclusive collection of modern art from famous contemporary artists.",
      price: "40",
    },
  ];

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h3>{ticket.name}</h3>
          {/* More ticket details */}
          <Link to={`/booking/${ticket.id}`} className="button">
            Book Now
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Ticket;
