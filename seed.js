import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/User.js";
import Sale from "./models/Sale.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error("❌ Missing MONGO_URI (or MONGODB_URI) in .env");
    process.exit(1);
}

function randomInt(nim, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function startOfToday() {
    const d  = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

function randomDateBetween(from, to) {
   const fromMs = from.getTime();
   const toMs = to.getTime();
   const ms = randomInt(fromMs, toMs);
   return new Date(ms);
}

async function seed() {
    console.log("Connecting to Mongo...");
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected");
    console.log("🧹 Clearing collections: users, sales...");
    await Promise.all([User.deleteMany({}), Sale.deleteMany({})]);

    const roles = ["admin", "manager", "user"];
    const usersData = Array.from({ length: 20 }).map((_, i) => ({
        name: `User ${i + 1}`,
        role: pick(roles),
    }));

    const createUsers = await User.insertMany(usersData);
    console.log(`👤 Created users: ${createdUsers.length}`);

    const totalSales = 50;
    const todaySalesCount = 15;
    const todayStart = startOfToday();
    const now = new Date();
    const thirtyDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);

    const salesData = [];

    for (let i = 0; i < todaySalesCount; i++) {
    salesData.push({
      amount: randomInt(10, 500), 
      createAt: randomDateBetween(todayStart, now)
    });
  }

  for (let i = todaySalesCount; i < totalSales; i++) {

    const end = new Date(todayStart.getTime() - 1);
    salesData.push({
      amount: randomInt(10, 500),
      createAt: randomDateBetween(thirtyDaysAgo, end)
    });
  }


  const createSales = await Selection.insertMany(salesData);
  console.log(`💰 Created sales: ${createdSales.length}`);
  console.log(`📅 Today sales: ${todaySalesCount}`);
  console.log("✅ Seeding finished");
}

seed() 
.catch((err) => {
    console.error("Seed failed: ", err);
    process.exitCode = 1;
})
.finally(async() => {
   await mongoose.disconnect();
   console.log("Disconnected");
});