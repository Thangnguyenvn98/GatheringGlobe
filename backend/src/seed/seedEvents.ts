import { faker } from "@faker-js/faker";
import Event from "../models/event";

const categories = [
  "nature",
  "city",
  "tech",
  "people",
  "food",
  "sports",
  "education",
  "fitness",
  "nightlife",
  "music",
  "fashion",
  "entertainment",
  "travel",
  "finance",
  "pets",
];

export const generateEvents = async (numEvents: number, users: any[]) => {
  const events = [];
  for (let i = 0; i < numEvents; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const imageUrls = Array.from({ length: 5 }, () => {
      // Randomize category and optionally size for each image
      const category = faker.helpers.arrayElement(categories);
      const width = faker.number.int({ min: 600, max: 800 });
      const height = faker.number.int({ min: 400, max: 1200 });
      return faker.image.urlLoremFlickr({ category, width, height });
    });
    const refDate = new Date();
    const daysFuture = faker.number.int({ min: 10, max: 14 });
    const startTime = new Date(
      refDate.getTime() + daysFuture * 24 * 60 * 60 * 1000
    );
    const endTime = new Date(
      startTime.getTime() + faker.number.int({ min: 3600000, max: 86400000 })
    );
    const city = faker.location.city();
    const country = faker.location.country();
    const postalCode = faker.location.zipCode();
    const province = faker.location.state();
    const fullAddress = `${city}, ${province}, ${country}, ${postalCode}`;
    const event = new Event({
      title: faker.music.songName(),
      description: faker.lorem.paragraphs(2),
      startTime: startTime,
      endTime: endTime,
      capacity: faker.number.int({ min: 100, max: 500 }),
      organizerId: randomUser._id, // Link to a random user as organizer
      location: {
        city: city,
        country: country,
        postalCode: postalCode,
        state: province,
        fullAddress: fullAddress,
      },
      category: faker.helpers.arrayElement([
        "Music",
        "Comedy",
        "Art",
        "Food And Drink",
        "Fitness",
        "Nightlife",
        "Technology",
        "Sports",
        "Books",
        "Science",
        "Fashion",
        "Politics",
        "Parenting",
        "Entertainment",
        "Pets",
        "Gardening",
        "Gaming",
        "Finance",
        "Education",
        "History",
        "Food",
        "Health",
        "Lifestyle",
      ]),
      postalCode: faker.location.zipCode(),
      eventType: faker.helpers.arrayElement([
        "Concert",
        "Exhibition",
        "Conference",
        "Match",
        "Competition",
        "Party",
        "Festival",
        "Seminar",
        "Workshop",
        "Meetup",
        "Networking",
        "Exhibition",
        "Fundraiser",
        "Premiere",
        "Charity",
        "Expo",
        "Tournament",
        "Livestream",
        "Camp",
        "Retreat",
        "Cruise",
        "Premiere",
        "Screening",
        "Launch",
        "Rally",
        "Tasting",
        "Sale",
        "Open House",
        "Auction",
        "Hackathon",
      ]),
      artistName: faker.person.fullName(),
      imageUrls: imageUrls,
      tickets: [],
      roomChatLink: faker.internet.url(),
    });
    await event.save();
    events.push(event);
  }
  return events;
};
