import {React, useState} from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
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
  ];

  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [showUploadProfilePicModal, setShowUploadProfilePicModal] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});

  const handleEditDetails = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!dob) newErrors.dob = 'Date of Birth is required';
    if (!location) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Handle updating details logic here
      setShowEditDetailsModal(false);
    }
  };

  const handleUploadProfilePic = () => {
    // Handle profile picture upload logic here
    setShowUploadProfilePicModal(false);
  };

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
            <Button variant="outline-secondary" onClick={() => setShowEditDetailsModal(true)}>Edit Details</Button>
            <Button variant="primary" onClick={() => setShowUploadProfilePicModal(true)}>Upload Profile Picture</Button>
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
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadProfilePicModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUploadProfilePic}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
