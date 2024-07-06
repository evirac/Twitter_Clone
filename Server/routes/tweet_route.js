const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Tweet = require('../models/tweet_model');
const { protect } = require('../middleware/auth');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// Create a new tweet
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? req.file.path : null;

    const newTweet = new Tweet({
      content,
      image,
      tweetedBy: req.user._id,
    });

    await newTweet.save();

    res.status(201).json(newTweet);
  } catch (err) {
    console.error('Error posting tweet:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all tweets
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find().populate('tweetedBy', 'username name profilePic').sort({ date: -1 });
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single tweet
router.get('/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate('tweetedBy', 'username name profilePic');

    if (tweet) {
      res.json(tweet);
    } else {
      res.status(404).json({ message: 'Tweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tweets by a specific user
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const tweets = await Tweet.find({ tweetedBy: req.params.userId })
      .populate('tweetedBy', 'username name profilePic')
      .sort({ date: -1 });
    res.json(tweets);
  } catch (error) {
    console.error('Error fetching tweets for user:', req.params.userId, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tweets for the authenticated user
router.get('/user', protect, async (req, res) => {
  console.log("Reached /tweets/user route");
  try {
    console.log("reached authenticated user tweets");
    const tweets = await Tweet.find({ tweetedBy: req.user._id })
      .populate('tweetedBy', 'username name profilePic')
      .sort({ date: -1 });
    res.json(tweets);
  } catch (error) {
    console.error('Error fetching tweets for authenticated user:', req.user._id, error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Like a tweet
router.put('/like/:id', protect, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (tweet) {
      if (tweet.likes.includes(req.user._id)) {
        tweet.likes.pull(req.user._id);
      } else {
        tweet.likes.push(req.user._id);
      }

      await tweet.save();
      res.json(tweet);
    } else {
      res.status(404).json({ message: 'Tweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Retweet a tweet
router.put('/retweet/:id', protect, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (tweet) {
      if (tweet.retweetBy.includes(req.user._id)) {
        tweet.retweetBy.pull(req.user._id);
      } else {
        tweet.retweetBy.push(req.user._id);
      }

      await tweet.save();
      res.json(tweet);
    } else {
      res.status(404).json({ message: 'Tweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
