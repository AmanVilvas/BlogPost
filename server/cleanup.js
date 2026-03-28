const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/post-model');
const User = require('./models/user-model');

async function cleanup() {
  const uri = process.env.MONGO_URI || process.env.MONGO_URL || process.env.MONGODB_URI;
  console.log('Connecting to:', uri ? uri.substring(0, 30) + '...' : 'URI NOT FOUND');
  
  await mongoose.connect(uri);
  console.log('Connected!');

  // Find wrapper posts: has repostOf set, no text, no media
  const wrappers = await Post.find({ 
    repostOf: { $exists: true, $ne: null }
  }).select('_id text media repostOf');

  const stale = wrappers.filter(w => !w.text && !w.media);
  console.log('Total posts with repostOf:', wrappers.length);
  console.log('Stale wrapper posts (no text, no media):', stale.length);

  if (stale.length > 0) {
    const ids = stale.map(w => w._id);
    await Post.deleteMany({ _id: { $in: ids } });
    for (const id of ids) {
      await User.updateMany({ threads: id }, { $pull: { threads: id } });
    }
    console.log('Cleaned up', stale.length, 'stale wrapper posts!');
  } else {
    console.log('Nothing to clean up.');
  }

  await mongoose.disconnect();
  console.log('Done.');
}

cleanup().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
