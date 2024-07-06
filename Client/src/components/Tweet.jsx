import React, { useState } from 'react';
import { FaHeart, FaComment, FaRetweet } from 'react-icons/fa';
import Image from 'react-bootstrap/esm/Image';
import '../sass/Tweet.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Tweet = ({ content, image, tweetedBy, date }) => {
  const [hearted, setHearted] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const toggleHearted = () => setHearted(!hearted);
  const toggleRetweeted = () => setRetweeted(!retweeted);

  // Ensure tweetedBy is defined and provide default values if necessary
  const profilePicUrl = tweetedBy?.profilePic ? `${API_URL}/${tweetedBy.profilePic}` : "/assets/default_user.jpg";
  const username = tweetedBy?.username || 'Unknown User';

  return (
    <div className="tweet">
      <div className="tweet-header">
        <Image src={profilePicUrl} alt="Profile" className="tweet-profile-pic" />
        <div className="tweet-info">
          <span className="tweet-name">{username}</span> <span className="tweet-handle">@{username}</span> <span className="tweet-date">· {new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="tweet-content">{content}</div>
      {image && <Image src={`${API_URL}/${image}`} alt="Tweet" className="tweet-image" />}
      <div className="tweet-actions">
        <FaHeart className={`tweet-icon ${hearted ? 'hearted' : ''}`} onClick={toggleHearted} />
        <FaComment className="tweet-icon" />
        <FaRetweet className={`tweet-icon ${retweeted ? 'retweeted' : ''}`} onClick={toggleRetweeted} />
      </div>
    </div>
  );
};

export default Tweet;
