// Adds a repeatable set of sample accounts and photo posts to the configured database.
// Run from server/: node seed-demo.js
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const connectDB = require('./config/db')
const User = require('./models/user-model')
const Post = require('./models/post-model')

const people = [
  ['maya.chen', 'Maya Chen', 'collecting little moments & big feelings ☁️'],
  ['theo.rivera', 'Theo Rivera', 'usually outside, always curious 🌿'],
  ['nina.park', 'Nina Park', 'flowers, film, and finding my way'],
  ['leo.martin', 'Leo Martin', 'making things slowly, on purpose'],
  ['amara.jones', 'Amara Jones', 'soft life, loud laugh ✨'],
  ['kai.williams', 'Kai Williams', 'city walks & side quests'],
  ['sofia.rossi', 'Sofia Rossi', 'pasta first. questions later.'],
  ['eli.brooks', 'Eli Brooks', 'designing a life I don’t need a vacation from'],
  ['zara.patel', 'Zara Patel', 'books with bent corners & iced chai'],
  ['noah.kim', 'Noah Kim', 'learning to look closer 📷'],
  ['luna.garcia', 'Luna Garcia', 'here for the golden hour'],
  ['asher.reed', 'Asher Reed', 'weekend baker / weekday dreamer'],
  ['ivy.thompson', 'Ivy Thompson', 'a garden is a tiny act of hope'],
  ['omar.hassan', 'Omar Hassan', 'good food, better company'],
  ['cleo.bennett', 'Cleo Bennett', 'wearing the outfit, taking the photo'],
  ['milo.foster', 'Milo Foster', 'somewhere between a playlist and a plan'],
  ['sana.ali', 'Sana Ali', 'making room for wonder'],
  ['jules.carter', 'Jules Carter', 'tiny studio, giant ideas'],
  ['remy.dubois', 'Remy Dubois', 'the long way is usually prettier'],
  ['ada.murphy', 'Ada Murphy', 'notes from a curious mind'],
  ['benji.price', 'Benji Price', 'coffee before coordinates'],
  ['priya.nair', 'Priya Nair', 'saving the best bits for later'],
  ['felix.ward', 'Felix Ward', 'old cameras, new places'],
  ['talia.green', 'Talia Green', 'small joys enthusiast'],
  ['drew.morgan', 'Drew Morgan', 'making ordinary days feel like something'],
]

const thoughts = [
  'A reminder from this morning: you are allowed to take the scenic route.',
  'Found a place that makes time feel a little softer. Saving it for a rainy day.',
  'The light did that thing again. You know the one. Had to stop and look.',
  'A tiny win is still a win. Writing this down so future me remembers.',
  'Made something with my hands today and forgot to check my phone. 10/10.',
  'Weekend plan: no plan. Maybe a walk, maybe a pastry, definitely no rush.',
  'Current favorite sound: the city waking up before everybody else.',
  'Some days the whole point is the coffee and the company.',
  'I used to save nice things for special days. Today counts as a special day.',
  'A little color for your scroll. Hope something good finds you today 🌼',
  'The best conversations always happen five minutes after you said goodbye.',
  'Reminder to text the friend you keep thinking about. They miss you too.',
  'This week taught me that slow progress is still progress.',
  'I took the long way home and it was absolutely the right call.',
  'Consider this your permission slip to romanticize the mundane.',
  'Started the book. Ignored all responsibilities. No regrets.',
  'A window seat and an hour to think. That is the whole post.',
  'Made a playlist for a version of me I haven’t met yet.',
  'Nature has a way of making my to-do list feel less dramatic.',
  'Today’s assignment: notice three things you usually walk past.',
  'The recipe said 20 minutes. The kitchen says we had a good time.',
]

const photoIds = [
  'photo-1470252649378-9c29740c9fa8','photo-1470770841072-f978cf4d019e','photo-1500530855697-b586d89ba3ee',
  'photo-1470071459604-3b5ec3a7fe05','photo-1501785888041-af3ef285b470','photo-1441974231531-c6227db76b6e',
  'photo-1472396961693-142e6e269027','photo-1464822759023-fed622ff2c3b','photo-1518837695005-2083093ee35b',
  'photo-1490750967868-88aa4486c946','photo-1490730141103-6cac27aaab94','photo-1500534623283-312aade485b7',
  'photo-1470252649378-9c29740c9fa8','photo-1507525428034-b723cf961d3e','photo-1511497584788-876760111969',
]

async function seed() {
  await connectDB()
  if (mongoose.connection.readyState !== 1) throw new Error('MongoDB connection was not established; no demo data was written.')
  const password = await bcrypt.hash('blogpost-demo-2026', 10)
  const users = []
  for (let i = 0; i < people.length; i += 1) {
    const [handle, name, bio] = people[i]
    const email = `${handle}@demo.blogpost.local`
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { userName: handle, email, bio, password, profilePic: `https://i.pravatar.cc/160?img=${i + 1}` } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
    users.push(user)
  }

  let created = 0
  for (let i = 0; i < 55; i += 1) {
    const user = users[i % users.length]
    const text = `${thoughts[i % thoughts.length]}${i >= thoughts.length ? ` (${Math.floor(i / thoughts.length) + 1})` : ''}`
    let post = await Post.findOne({ admin: user._id, text })
    if (!post) {
      post = await Post.create({
        admin: user._id,
        text,
        media: `https://images.unsplash.com/${photoIds[i % photoIds.length]}?auto=format&fit=crop&w=1200&q=85`,
        createdAt: new Date(Date.now() - i * 47 * 60 * 1000),
      })
      await User.updateOne({ _id: user._id }, { $addToSet: { threads: post._id } })
      created += 1
    }
  }

  console.log(`Demo data ready: ${users.length} users, ${created} new posts (55 posts in the set).`)
  console.log('Demo account password: blogpost-demo-2026')
  await mongoose.disconnect()
}

seed().catch(async (error) => {
  console.error('Demo seed failed:', error.message)
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect()
  process.exitCode = 1
})
