const { connectDatabase } = require("../database/connectDB.js");
const { faker } = require("@faker-js/faker");
const crypto = require("crypto");
const eventModel = require("../database/models/event.model.js");
const userModel = require("../database/models/user.model.js");

async function createDummyUsers(count) {
  await connectDatabase();

  const users = [];

  for (let i = 0; i < count; i++) {
    const user = {
      name: faker.name.fullName(),
      image: faker.image.avatar(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      gender: ["Male", "Female", "Other"][crypto.randomInt(0, 3)],
    };

    users.push(user);
  }

  await userModel.insertMany(users);
}

async function createDummyEvents(count) {
  await connectDatabase();
  const users = await userModel.find();

  let events = [];

  for (let i = 0; i < count; i++) {
    const author = users[crypto.randomInt(0, users.length)];

    let icons = [];
    for (let j = 0; j < crypto.randomInt(1, 3); j++) {
      let icon = [
        "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP2.png%3Fq%3D20&w=1920&q=50",
        "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP4.png%3Fq%3D20&w=1920&q=50",
        "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP5.png%3Fq%3D20&w=1920&q=50",
        "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP66.png%3Fq%3D20&w=1920&q=50",
        "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP57.png%3Fq%3D20&w=1920&q=50",
        "https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP51.png%3Fq%3D20&w=1920&q=50",
      ][crypto.randomInt(0, 6)];
      icons.push(icon);
    }

    let event = {
      description: faker.lorem.paragraph(),
      title: faker.lorem.lines(1),
      icon: icons[crypto.randomInt(0, 5)],
      timming: new Date(
        faker.date.between(
          "2023-01-01T00:00:00.000Z",
          "2030-01-01T00:00:00.000Z"
        )
      ),
      image: faker.image.city(),
      duration: [5, 4, 3, 2, 1, 6, 7, 8, 9, 10][crypto.randomInt(0, 10)],
      address: faker.address.country(),
      icons: icons,
      rating: Math.round(crypto.randomInt(0, 10) * 0.49 * 100) / 100,
      court: ["Court 1", "Court 2", "Court 3"][crypto.randomInt(0, 3)],
      author: {
        _id: author._id,
        name: author.name,
        image: author.image,
      },
    };

    events.push(event);
  }

  await eventModel.insertMany(events);
  console.log("Done");
}

createDummyUsers(50).then(() => createDummyEvents(50));
