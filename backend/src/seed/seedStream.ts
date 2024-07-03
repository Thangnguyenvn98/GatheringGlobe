import { faker } from "@faker-js/faker";
import Stream from "../models/stream";
import User from "../models/user";

export const generateStreams = async () => {
  const usersWithoutStreams = await User.find({
    _id: { $nin: await Stream.distinct("userId") },
  }).exec();

  const streams = [];

  for (const user of usersWithoutStreams) {
    const stream = new Stream({
      name: faker.commerce.productName(),
      ingressId: faker.string.uuid(),
      serverUrl: faker.internet.url(),
      streamKey: faker.string.alphanumeric(9),
      thumbnailUrl: faker.image.urlLoremFlickr({ width: 600, height: 600 }),
      isLive: faker.datatype.boolean(),
      userId: user._id,
      usedOBS: faker.datatype.boolean(),
    });

    await stream.save();
    streams.push(stream);
  }

  return streams;
};
