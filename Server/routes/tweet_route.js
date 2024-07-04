const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweet_model');
const { protect } = require('../middleware/auth');

// Post a tweet
router.post('/', protect, async (req, res) => {
  const { content, image } = req.body;

  try {
    const tweet = await Tweet.create({
      tweetedBy: req.user._id,
      content,
      image,
    });

    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
