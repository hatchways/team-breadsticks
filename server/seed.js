const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "sample.env" });

const connectDB = require("./db");

const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const Profile = require("./models/ProfileModel");

async function deleteData() {
  try {
    await User.deleteMany();
    console.log("Users are deleted..");

    await Conversation.deleteMany();
    console.log("Conversations are deleted..");

    await Message.deleteMany();
    console.log("Messages are deleted..");

    await Profile.deleteMany();
    console.log("Profiles are deleted..");
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

  const test5 = await User.create({
    username: "test5",
    email: "test5@gmail.com",
    password: "123123",
  });

  const test6 = await User.create({
    username: "test6",
    email: "test6@gmail.com",
    password: "123123",
  });

  const test7 = await User.create({
    username: "test7",
    email: "test7@gmail.com",
    password: "123123",
  });

  const test8 = await User.create({
    username: "test8",
    email: "test8@gmail.com",
    password: "123123",
  });

  const demoUserProfile = await Profile.create({
    userId: demoUser._id,
    firstName: "demoFname",
    lastName: "demoLname",
    address: "toronto, ontario",
    phone: "123-123-1234",
    description:
      "Hello! I am a demoUser. Hello! I am a demoUser. Hello! I am a demoUser. Hello! I am a demoUser. ",
    birth: "2021-01-01",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sky",
      "https://robohash.org/test-sitter-1.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Male",
  });

  const test1Profile = await Profile.create({
    userId: test1._id,
    firstName: "test1Fname",
    lastName: "test1Lname",
    address: "montreal, quebec",
    phone: "111-222-3333",
    description:
      "Hello! I am TEST1. Hello! I am TEST1. Hello! I am TEST1. Hello! I am TEST1. ",
    birth: "2021-02-02",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Female",
    isSitter: true,
    title: "I love pets1",
    hourlyWage: 11,
  });

  const test2Profile = await Profile.create({
    userId: test2._id,
    firstName: "test2Fname",
    lastName: "test2Lname",
    address: "ottawa, ontario",
    phone: "111-222-3333",
    description:
      "Hello! I am test2. Hello! I am test2. Hello! I am test2. Hello! I am test2. ",
    birth: "2021-02-02",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Other",
    isSitter: true,
    title: "I love pets2",
    hourlyWage: 12,
  });

  const test3Profile = await Profile.create({
    userId: test3._id,
    firstName: "test3Fname",
    lastName: "test3Lname",
    address: "ottawa, ontario",
    phone: "222-333-4444",
    description:
      "Hello! I am test3. Hello! I am test3. Hello! I am test3. Hello! I am test3. ",
    birth: "2021-03-03",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Male",
    isSitter: true,
    title: "I love pets3",
    hourlyWage: 13,
  });

  const test4Profile = await Profile.create({
    userId: test4._id,
    firstName: "test4Fname",
    lastName: "test4Lname",
    address: "toronto, ontario",
    phone: "222-333-4444",
    description:
      "Hello! I am test4. Hello! I am test4. Hello! I am test4. Hello! I am test4. ",
    birth: "2021-03-03",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Male",
    isSitter: true,
    title: "I love pets4",
    hourlyWage: 14,
  });

  const test5Profile = await Profile.create({
    userId: test5._id,
    firstName: "test5Fname",
    lastName: "test5Lname",
    address: "ottawa, ontario",
    phone: "222-333-4444",
    description:
      "Hello! I am test5. Hello! I am test5. Hello! I am test5. Hello! I am test5. ",
    birth: "2021-03-03",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Male",
    isSitter: true,
    title: "I love pets5",
    hourlyWage: 15,
  });

  const test6Profile = await Profile.create({
    userId: test6._id,
    firstName: "test6Fname",
    lastName: "test6Lname",
    address: "vancouver, british columbia",
    phone: "222-333-4444",
    description:
      "Hello! I am test6. Hello! I am test6. Hello! I am test6. Hello! I am test6. ",
    birth: "2021-03-03",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Male",
    isSitter: true,
    title: "I love pets6",
    hourlyWage: 16,
  });

  const test7Profile = await Profile.create({
    userId: test7._id,
    firstName: "test7Fname",
    lastName: "test7Lname",
    address: "Burnaby, British columbia",
    phone: "222-333-4444",
    description:
      "Hello! I am test7. Hello! I am test7. Hello! I am test7. Hello! I am test7. ",
    birth: "2021-03-03",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Male",
    isSitter: true,
    title: "I love pets7",
    hourlyWage: 17,
  });

  const test8Profile = await Profile.create({
    userId: test8._id,
    firstName: "test8Fname",
    lastName: "test8Lname",
    address: "toronto, ontario",
    phone: "222-333-4444",
    description:
      "Hello! I am test8. Hello! I am test8. Hello! I am test8. Hello! I am test8. ",
    birth: "2021-03-03",
    photos: [
      "https://source.unsplash.com/600x200/?nature,sea",
      "https://robohash.org/test-sitter-2.png",
      "https://source.unsplash.com/125x125/?animal,puppy",
      "https://source.unsplash.com/125x125/?animal,cat",
      "https://source.unsplash.com/125x125/?animal,dog",
    ],
    gender: "Female",
    isSitter: true,
    title: "I love pets8",
    hourlyWage: 18,
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
