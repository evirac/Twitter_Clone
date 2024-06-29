const Tweet = require('../models/tweet_model');

const createTweet = async (req, res) => {
  try {
    const { content, image } = req.body;
    const newTweet = new Tweet({
      content,
      image,
      TweetedBy: req.user.id,
    });

    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate('TweetedBy', 'username profilePicture');
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTweetById = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate('TweetedBy', 'username profilePicture');
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTweet,
  getTweets,
  getTweetById,
};
