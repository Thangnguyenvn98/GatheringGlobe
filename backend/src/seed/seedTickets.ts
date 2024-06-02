import { faker } from '@faker-js/faker';
import Ticket, { TicketType } from '../models/ticket';  // Adjust the path as per your project structure

const statuses = ['Available', 'Sold Out', 'Discounted'];

export const generateTickets = async (events: any[]) => {
  const tickets:any[] = [];

  events.forEach((event, index) => {
    const numTickets = faker.number.int({ min: 1, max: 4 }); // Generate between 1 to 4 types of tickets
    const isFreeTicketEvent = (index + 1) % 5 === 0;  // Every fifth event gets a free ticket

    let ticketTypes = [
      'General Admission',
      'VIP',
      'Backstage Pass',
      'Child Ticket',
      'Senior Ticket',
      'Group Ticket'
    ];

    // Shuffle and select a subset of ticket types
    const selectedTypes = faker.helpers.shuffle(ticketTypes).slice(0, numTickets);
    
    // Ensure at least one free ticket every fifth event
    if (isFreeTicketEvent) {
      selectedTypes.push('Free');
    }

    selectedTypes.forEach(type => {
      const price = type === 'Free' ? 0 :
                    type === 'Child Ticket' || type === 'Senior Ticket' ? faker.number.float({ min: 10.00, max: 25.00 }) :
                    type === 'Group Ticket' ? faker.number.float({ min: 50.00, max: 100.00 }) :
                    faker.number.float({ min: 20.00, max: 150.00 });
      tickets.push(new Ticket({
        eventId: event._id,
        seatNumber: faker.number.int({ min: 1, max: 300 }).toString(),
        price: price,
        status: faker.helpers.arrayElement(statuses),
        quantityAvailable: faker.number.int({ min: 10, max: 100 }),
        type: type,
        isFree: type === 'Free'
      }));
    });
  });

  // Save all tickets
  for (const ticket of tickets) {
    await ticket.save();
  }

  return tickets;
};
