import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import '../sass/Profile.scss';
import Tweet from '../components/Tweet';

const Profile = () => {
  const userTweets = [
    {
      id: 1,
      name: 'User Name',
      profilePic: 'https://via.placeholder.com/40',
      handle: '@username',
      date: '1h',
      content: 'This is a sample tweet by the user.',
      image: 'https://via.placeholder.com/600x200',
    },
    {
      id: 2,
      name: 'User Name',
      profilePic: 'https://via.placeholder.com/40',
      handle: '@username',
      date: 'Jun 24',
      content: 'Another sample tweet by the user.',
      image: '',
    },
    // Add more tweets as needed
  ];

  return (
    <div className="profile-page">
        <h2>Profile</h2>
      <div className="profile-cover">
        <div className="profile-header">
          <Image
            src="https://via.placeholder.com/150"
            roundedCircle
            className="profile-pic"
          />
          <div className="profile-actions">
            <Button variant="outline-secondary">Edit Details</Button>
            <Button variant="primary">Upload Profile Picture</Button>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <h2 className="profile-name">User Name</h2>
        <div className="profile-handle">@username</div>
        <div className="profile-info">
          <div><FaBirthdayCake /> Date of Birth: January 1, 2000</div>
          <div><FaCalendarAlt /> Joined: June 2021</div>
          <div><FaMapMarkerAlt /> Location: City, Country</div>
        </div>
        <div className="profile-follow-stats">
          <span>100 Following</span>
          <span>200 Followers</span>
        </div>
      </div>
      <div className="profile-tweets">
        <h3>Tweets & Replies</h3>
        {userTweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
