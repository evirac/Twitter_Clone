// src/components/Tweet.jsx
import React, { useState } from 'react';
import { FaHeart, FaComment, FaRetweet } from 'react-icons/fa';
import Image from 'react-bootstrap/esm/Image';
import '../sass/Tweet.scss';

const Tweet = ({name, profilePic, handle, date, content, image }) => {
  const [hearted, setHearted] = useState(false);
  const [retweeted, setRetweeted] = useState(false)

  const toggleHearted = () => setHearted(!hearted);
  const toggleRetweeted = () => setRetweeted(!retweeted);

  return (
    <div className="tweet">
      <div className="tweet-header">
        <Image src={profilePic} alt="Profile" className="tweet-profile-pic" />
        <div className="tweet-info">
          <span className="tweet-name">{name}</span> <span className="tweet-handle">{handle}</span> <span className="tweet-date">· {date}</span>
        </div>
      </div>
      <div className="tweet-content">{content}</div>
      {image && <Image
       src={image} alt="Tweet" className="tweet-image" />}
      <div className="tweet-actions">
        <FaHeart className={`tweet-icon ${hearted ? 'hearted' : ''}`} onClick={toggleHearted} />
        <FaComment className="tweet-icon" />
        <FaRetweet className={`tweet-icon ${retweeted ? 'retweeted' : ''}`} onClick={toggleRetweeted} />
      </div>
    </div>
  );
};

export default Tweet;
