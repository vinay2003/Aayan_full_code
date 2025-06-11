const mongoose = require("mongoose");
const Image = require("./models/Image"); // Make sure path is correct
require("dotenv").config();

const images = [
  {
    id: 1,
    url: "https://plus.unsplash.com/premium_photo-1747831949491-120b4d7ea4d6?q=80&w=3436&auto=format&fit=crop",
    title: "Serenity in the Forest",
    description: "Escape into the peaceful calm of green landscapes."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1749448621505-ed86401fec28?q=80&w=3387&auto=format&fit=crop",
    title: "Golden Hour Bliss",
    description: "Feel the warmth of sunset light and distant horizons."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1749449456588-ef30946060ca?q=80&w=3387&auto=format&fit=crop",
    title: "Mountains of Mystery",
    description: "Discover breathtaking heights and misty peaks."
  },
  {
    id: 4,
    url: "https://plus.unsplash.com/premium_photo-1747831949491-120b4d7ea4d6?q=80&w=3436&auto=format&fit=crop",
    title: "Nature's Reflection",
    description: "A mirror-like lake capturing the soul of nature."
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });
    await Image.deleteMany(); // optional: clear old
    await Image.insertMany(images);
    console.log("Data Seeded Successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding DB:", err);
    process.exit(1);
  }
}

module.exports = seedDB;

// If running directly:
if (require.main === module) {
  seedDB();
}
