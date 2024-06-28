import React, { useState, useEffect } from 'react';
import Tweet from '../components/Tweet';
import '../sass/Explore.scss';

const Explore = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [popularTweets, setPopularTweets] = useState([]);
  const [suggestedAccounts, setSuggestedAccounts] = useState([]);

  useEffect(() => {
    // Mock trending topics
    setTrendingTopics(['ReactJS', 'JavaScript', 'WebDevelopment', 'CSS', 'HTML']);

    // Mock popular tweets
    setPopularTweets([
      {
        id: 1,
        name: 'John Doe',
        profilePic: 'https://via.placeholder.com/40',
        handle: '@johndoe',
        date: '1h',
        content: 'Just learned about React hooks!',
        image: 'https://via.placeholder.com/600x200',
      },
      {
        id: 2,
        name: 'Jane Smith',
        profilePic: 'https://via.placeholder.com/40',
        handle: '@janesmith',
        date: '2h',
        content: 'JavaScript is amazing!',
        image: '',
      },
      // Add more tweets as needed
    ]);

    // Mock suggested accounts
    setSuggestedAccounts([
      {
        id: 1,
        name: 'Alice Johnson',
        profilePic: 'https://via.placeholder.com/40',
        handle: 'alicejohnson',
      },
      {
        id: 2,
        name: 'Bob Brown',
        profilePic: 'https://via.placeholder.com/40',
        handle: 'bobbrown',
      },
      // Add more accounts as needed
    ]);
  }, []);

  return (
    <div className="explore-page">
      <div className="trending-topics">
        <h2>Trending Topics</h2>
        <ul>
          {trendingTopics.map((topic, index) => (
            <li key={index}>
              <a href={`/hashtag/${topic}`}>#{topic}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="popular-tweets">
        <h2>Popular Tweets</h2>
        {popularTweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>

      <div className="suggested-accounts">
        <h2>Suggested Accounts</h2>
        <ul>
          {suggestedAccounts.map((account) => (
            <li key={account.id}>
              <img src={account.profilePic} alt="Profile" />
              <div>
                <span className="account-name">{account.name}</span>
                <span className="account-handle">@{account.handle}</span>
              </div>
              <button className="follow-btn">Follow</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Explore;
