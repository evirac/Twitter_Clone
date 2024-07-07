import React, { useState } from 'react';
import { FaHeart, FaComment, FaRetweet } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import '../sass/Tweet.scss';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Tweet = ({ _id, content, image, tweetedBy, date, likes, retweetBy }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;
  const username = user ? user.username : null;

  const [liked, setLiked] = useState(likes.includes(userId));
  const [retweeted, setRetweeted] = useState(retweetBy.includes(userId));
  const [likesCount, setLikesCount] = useState(likes.length);
  const [retweetsCount, setRetweetsCount] = useState(retweetBy.length);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/tweets/like/${_id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLiked(!liked);
      setLikesCount(response.data.likes.length);
    } catch (error) {
      console.error('Failed to like the tweet', error);
    }
  };

  const handleRetweet = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/tweets/retweet/${_id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRetweeted(!retweeted);
      setRetweetsCount(response.data.retweetBy.length);
    } catch (error) {
      console.error('Failed to retweet', error);
    }
  };

  // Ensure tweetedBy is defined and provide default values if necessary
  const profilePicUrl = tweetedBy?.profilePic ? `${API_URL}/${tweetedBy.profilePic}` : "/assets/default_user.jpg";
  const tweetedByUsername = tweetedBy?.username || 'Unknown User';

  return (
    <div className="tweet">
      {retweeted && (
          <div className="retweet-label">
            <FaRetweet /> Retweeted by {username}
          </div>
        )}
      <div className="tweet-header">
        <Image src={profilePicUrl} alt="Profile" className="tweet-profile-pic" />
        <div className="tweet-info">
          <span className="tweet-name">{tweetedByUsername}</span> <span className="tweet-handle">@{tweetedByUsername}</span> <span className="tweet-date">· {new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="tweet-content">{content}</div>
      {image && <Image src={`${API_URL}/${image}`} alt="Tweet" className="tweet-image" />}
      <div className="tweet-actions">
        <div className="tweet-action" onClick={handleLike}>
          <FaHeart className={`tweet-icon ${liked ? 'hearted' : ''}`} /> {likesCount}
        </div>
        <div className="tweet-action">
          <FaComment className="tweet-icon" />
        </div>
        <div className="tweet-action" onClick={handleRetweet}>
          <FaRetweet className={`tweet-icon ${retweeted ? 'retweeted' : ''}`} /> {retweetsCount}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
