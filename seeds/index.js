const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      // MY USER ID FOR: ahad
      author: "68af3a4580d54b095f6eadb9",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, distinctio nulla eius maiores voluptates adipisci quos necessitatibus cum, aperiam numquam amet veritatis nihil eligendi consequuntur officia blanditiis nam, assumenda explicabo.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dadapruqy/image/upload/v1756350802/YelpCamp/zopxxcwxhjkdvr8xugdn.jpg",
          filename: "YelpCamp/zopxxcwxhjkdvr8xugdn",
        },
        {
          url: "https://res.cloudinary.com/dadapruqy/image/upload/v1756350801/YelpCamp/g5trrp5v23jpbh3fi1iy.jpg",
          filename: "YelpCamp/g5trrp5v23jpbh3fi1iy",
        },
        {
          url: "https://res.cloudinary.com/dadapruqy/image/upload/v1756350802/YelpCamp/cbnfinmillxeyvdqktfp.jpg",
          filename: "YelpCamp/cbnfinmillxeyvdqktfp",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
