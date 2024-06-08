import { faker } from "@faker-js/faker";
import Ticket from "../models/ticket"; // Adjust the path as per your project structure
import Event from "../models/event";

const statuses = ["Available", "Sold Out", "Discounted"];

export const generateTickets = async (events: any[]) => {
  const tickets: any[] = [];

  for (const event of events) {
    const numTickets = faker.number.int({ min: 1, max: 4 }); // Generate between 1 to 4 types of tickets
    const isFreeTicketEvent = (events.indexOf(event) + 1) % 5 === 0; // Every fifth event gets a free ticket

    let ticketTypes = [
      "General Admission",
      "VIP",
      "Backstage Pass",
      "Child Ticket",
      "Senior Ticket",
      "Group Ticket",
    ];

    // Shuffle and select a subset of ticket types
    const selectedTypes = faker.helpers
      .shuffle(ticketTypes)
      .slice(0, numTickets);

    // Ensure at least one free ticket every fifth event
    if (isFreeTicketEvent) {
      selectedTypes.push("Free");
    }

    const eventTickets = [];

    for (const type of selectedTypes) {
      const price =
        type === "Free"
          ? 0
          : type === "Child Ticket" || type === "Senior Ticket"
            ? faker.number.float({ min: 10.0, max: 25.0 })
            : type === "Group Ticket"
              ? faker.number.float({ min: 50.0, max: 100.0 })
              : faker.number.float({ min: 20.0, max: 150.0 });
      const ticket = new Ticket({
        eventId: event._id,
        seatNumber: faker.number.int({ min: 1, max: 300 }).toString(),
        price: price,
        status: faker.helpers.arrayElement(statuses),
        quantityAvailable: faker.number.int({ min: 10, max: 100 }),
        type: type,
        isFree: type === "Free",
      });
      await ticket.save();
      eventTickets.push(ticket._id);
      tickets.push(ticket);
    }
    await Event.findByIdAndUpdate(event._id, {
      $push: { tickets: { $each: eventTickets } },
    });
  }

  return tickets;
};
