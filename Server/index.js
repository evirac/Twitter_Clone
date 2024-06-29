const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const URI = process.env.MONGO_URI

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(URI);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
app.use('/api/users', require('./routes/user_route'));
app.use('/api/tweets', require('./routes/tweet_route'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
