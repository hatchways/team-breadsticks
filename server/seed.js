const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "sample.env" });

const connectDB = require("./db");

const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

async function deleteData() {
  try {
    await User.deleteMany();
    console.log("Users are deleted..");

    await Conversation.deleteMany();
    console.log("Conversations are deleted..");

    await Message.deleteMany();
    console.log("Messages are deleted..");
  } catch (err) {
    console.error(err);
  }
}

async function seed() {
  await connectDB();
  await deleteData();

  const demoUser = await User.create({
    username: "test",
    email: "test@gmail.com",
    password: "123123",
  });

  const test1 = await User.create({
    username: "test1",
    email: "test1@gmail.com",
    password: "123123",
  });

  const test2 = await User.create({
    username: "test2",
    email: "test2@gmail.com",
    password: "123123",
  });

  const test3 = await User.create({
    username: "test3",
    email: "test3@gmail.com",
    password: "123123",
  });

  const test4 = await User.create({
    username: "test4",
    email: "test4@gmail.com",
    password: "123123",
  });

  // mock conversation between test1 and test2
  const test1Convo = await Conversation.create({
    user1: test1._id,
    user2: test2._id,
  });

  const test1test2Message1 = await Message.create({
    conversation: test1Convo._id,
    sender: test1.id,
    text: "test1 ---> test2",
    recipientRead: false,
  });

  const test1test2Message2 = await Message.create({
    conversation: test1Convo._id,
    sender: test1.id,
    text: "test1 ---> test2 (2nd)",
    recipientRead: false,
  });

  const test2test1Message1 = await Message.create({
    conversation: test1Convo._id,
    sender: test2.id,
    text: "test2 ---> test1",
    recipientRead: false,
  });

  const test2test1Message2 = await Message.create({
    conversation: test1Convo._id,
    sender: test2.id,
    text: "test2 ---> test1 (2nd)",
    recipientRead: false,
  });

  const test1test2Message3 = await Message.create({
    conversation: test1Convo._id,
    sender: test1.id,
    text: "test1 ---> test2 (3rd)",
    recipientRead: false,
  });

  test1Convo.latestMessage = test1test2Message3._id;
  await test1Convo.save();

  // mock conversation between test1 and test3
  const test1Convo2 = await Conversation.create({
    user1: test1._id,
    user2: test3._id,
  });

  const test1test3Message1 = await Message.create({
    conversation: test1Convo2._id,
    sender: test1.id,
    text: "test1 ---> test3",
    recipientRead: false,
  });

  const test1test3Message2 = await Message.create({
    conversation: test1Convo2._id,
    sender: test1.id,
    text: "test1 ---> test3 (2nd)",
    recipientRead: false,
  });

  const test1test3Message3 = await Message.create({
    conversation: test1Convo2._id,
    sender: test1.id,
    text: "test1 ---> test3 (3rd)",
    recipientRead: false,
  });

  const test3test1Message1 = await Message.create({
    conversation: test1Convo2._id,
    sender: test3.id,
    text: "test3 ---> test1",
    recipientRead: false,
  });

  const test3test1Message2 = await Message.create({
    conversation: test1Convo2._id,
    sender: test3.id,
    text: "test3 ---> test1 (2nd)",
    recipientRead: false,
  });

  const test1test3Message4 = await Message.create({
    conversation: test1Convo2._id,
    sender: test1.id,
    text: "test1 ---> test3 (4th)",
    recipientRead: false,
  });

  test1Convo2.latestMessage = test1test3Message4._id;
  await test1Convo2.save();

  // mock conversation between test2 and test3
  const test2Convo = await Conversation.create({
    user1: test2._id,
    user2: test3._id,
  });

  const test2test3Message1 = await Message.create({
    conversation: test2Convo._id,
    sender: test2.id,
    text: "test2 ---> test3",
    recipientRead: false,
  });

  const test2test3Message2 = await Message.create({
    conversation: test2Convo._id,
    sender: test2.id,
    text: "test2 ---> test3 (2nd)",
    recipientRead: false,
  });

  const test3test2Message1 = await Message.create({
    conversation: test2Convo._id,
    sender: test3.id,
    text: "test3 ---> test2",
    recipientRead: false,
  });

  const test3test2Message2 = await Message.create({
    conversation: test2Convo._id,
    sender: test3.id,
    text: "test3 ---> test2 (2nd)",
    recipientRead: false,
  });

  test2Convo.latestMessage = test3test2Message2._id;
  await test2Convo.save();
}

async function runSeed() {
  console.log("seeding..");
  try {
    await seed();
    console.log("data seeded successfully..");
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("MongoDB connection closed..".cyan.underline + "\n");
    process.exit();
  }
}

if (module === require.main) {
  runSeed();
}
