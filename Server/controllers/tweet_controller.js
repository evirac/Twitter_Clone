const Tweet = require('../models/tweet_model');

const createTweet = async (req, res) => {
    const tweet = new Tweet({
        ...req.body,
        tweetedBy: req.user._id,
    });

    try {
        await tweet.save();
        res.status(201).send(tweet);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find().populate('tweetedBy').populate('replies').exec();
        res.send(tweets);
    } catch (error) {
        res.status(500).send(error);
    }
};

const likeTweet = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            return res.status(404).send();
        }

        tweet.likes.push(req.user._id);
        await tweet.save();
        res.send(tweet);
    } catch (error) {
        res.status(500).send(error);
    }
};

const retweet = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            return res.status(404).send();
        }

        tweet.retweetBy.push(req.user._id);
        await tweet.save();
        res.send(tweet);
    } catch (error) {
        res.status(500).send(error);
    }
};

const replyTweet = async (req, res) => {
    const reply = new Tweet({
        ...req.body,
        tweetedBy: req.user._id,
        replies: [],
    });

    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            return res.status(404).send();
        }

        tweet.replies.push(reply);
        await tweet.save();
        await reply.save();
        res.status(201).send(reply);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createTweet,
    getTweets,
    likeTweet,
    retweet,
    replyTweet,
};
