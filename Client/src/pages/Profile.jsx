import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../sass/Profile.scss';
import Tweet from '../components/Tweet';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [showUploadProfilePicModal, setShowUploadProfilePicModal] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setName(response.data.name);
        setDob(response.data.dob);
        setLocation(response.data.location);
        fetchUserTweets(response.data._id); // Fetch tweets after fetching user profile
      } catch (err) {
        console.error('Failed to fetch user profile', err);
      }
    };

    const fetchUserTweets = async (userId) => {
      try {
        const response = await axios.get(`${API_URL}/tweets/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserTweets(response.data);
      } catch (err) {
        console.error('Failed to fetch user tweets', err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditDetails = async () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!dob) newErrors.dob = 'Date of Birth is required';
    if (!location) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const updatedUser = { name, dob, location };
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        await axios.put(`${API_URL}/users/profile`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ ...user, ...updatedUser });
        setShowEditDetailsModal(false);
      } catch (err) {
        console.error('Failed to update user details', err);
      }
    }
  };

  const handleUploadProfilePic = async (e) => {
    const formData = new FormData();
    formData.append('profilePic', e.target.files[0]);
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
      const response = await axios.put(`${API_URL}/users/profile/pic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.profilePic) {
        setUser({ ...user, profilePic: response.data.profilePic });
      } else {
        console.error('Profile picture upload failed.');
      }
    } catch (err) {
      console.error('Failed to upload profile picture', err);
    } finally {
      setShowUploadProfilePicModal(false); // Move this here to ensure it closes only after upload attempt
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const profilePicUrl = user.profilePic ? `${API_URL}/${user.profilePic}` : "/assets/default_user.jpg";

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-cover">
        <div className="profile-header">
          <Image
            src={profilePicUrl}
            roundedCircle
            className="profile-pic"
          />
          <div className="profile-actions">
            <Button variant="outline-secondary" onClick={() => setShowEditDetailsModal(true)}>Edit Details</Button>
            <Button variant="primary" onClick={() => setShowUploadProfilePicModal(true)}>Upload Profile Picture</Button>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <h2 className="profile-name">{user.name}</h2>
        <div className="profile-handle">@{user.username}</div>
        <div className="profile-info">
          <div><FaBirthdayCake /> Date of Birth: {user.dob}</div>
          <div><FaCalendarAlt /> Joined: {user.joined}</div>
          <div><FaMapMarkerAlt /> Location: {user.location}</div>
        </div>
        <div className="follow-info">
          <span>{user.following.length} Following</span>
          <span>{user.followers.length} Followers</span>
        </div>
      </div>
      <div className="profile-tweets">
        <h3>Tweets & Replies</h3>
        {userTweets.length === 0 ? (
          <div className="no-tweets-info">
            <p>You haven't posted any tweets yet.</p>
          </div>
        ) : (
          userTweets.map((tweet) => (
            <Tweet key={tweet._id} {...tweet} />
          ))
        )}
      </div>

      {/* Edit Details Modal */}
      <Modal show={showEditDetailsModal} onHide={() => setShowEditDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                isInvalid={!!errors.dob}
              />
              <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                isInvalid={!!errors.location}
              />
              <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditDetailsModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditDetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Upload Profile Picture Modal */}
      <Modal show={showUploadProfilePicModal} onHide={() => setShowUploadProfilePicModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            Profile picture should be in square shape.
          </Alert>
          <Form>
            <Form.Group controlId="formProfilePic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleUploadProfilePic} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadProfilePicModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
