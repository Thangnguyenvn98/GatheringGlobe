import { faker } from "@faker-js/faker";
import Discount from "../models/discount";
import Event from "../models/event";
import Ticket from "../models/ticket";

export const generateDiscounts = async () => {
  const today = new Date();

  const events = await Event.find({
    startTime: { $gte: today },
  })
    .sort({ startDate: 1 })
    .limit(20)
    .exec();

  const discounts = [];

  for (const event of events) {
    // Fetch tickets for the current event
    const eventTickets = await Ticket.find({ eventId: event._id }).exec();

    const numDiscounts = faker.number.int({ min: 1, max: 3 });
    const selectedTickets = faker.helpers
      .shuffle(eventTickets)
      .slice(0, numDiscounts);

    for (const ticket of selectedTickets) {
      const isPercentage = faker.datatype.boolean();
      const discount = new Discount({
        eventId: event._id,
        ticketId: ticket._id,
        code: faker.string.alphanumeric({
          length: { min: 4, max: 6 },
          casing: "upper",
        }),
        percentage: isPercentage
          ? faker.number.int({ min: 10, max: 50 })
          : undefined,
        number: !isPercentage
          ? faker.number.int({ min: 5, max: 20 })
          : undefined,
        validUntil: faker.date.future(),
        isActive: faker.datatype.boolean(),
        usageLimit: faker.number.int({ min: 10, max: 50 }),
        usedCount: faker.number.int({ min: 0, max: 10 }),
      });

      await discount.save();
      discounts.push(discount);
    }
  }

  return discounts;
};
