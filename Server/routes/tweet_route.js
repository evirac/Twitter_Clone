const router = require('express').Router();
const TweetController = require('../controllers/tweet_controller');
const auth = require('../middleware/auth');

router.post('/', auth, TweetController.createTweet);
router.get('/', TweetController.getTweets);
router.get('/:id', TweetController.getTweetById);

module.exports = router;
