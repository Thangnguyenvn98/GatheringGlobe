import { faker } from "@faker-js/faker";
import User from "../models/user";

export const generateUsers = async (numUsers: number) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const password = "password123"; // Standard password for all seeded users
    const user = new User({
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: password,
      imageUrl: faker.image.avatar(),
    });
    await user.save();
    users.push(user);
  }
  return users;
};
