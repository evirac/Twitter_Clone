import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../sass/Home.scss';
import Tweet from '../components/Tweet';

const Home = () => {
  const [show, setShow] = useState(false);
  const [tweetText, setTweetText] = useState('');
  const [tweetImage, setTweetImage] = useState(null);
  const [tweets, setTweets] = useState([
    {
      id: 1,
      name: 'ashwin',
      profilePic: 'https://via.placeholder.com/40',
      handle: '@ashwinravi99',
      date: '11h',
      content: 'This is a sample tweet #1',
      image: 'https://via.placeholder.com/600x200',
    },
    {
      id: 2,
      name: 'gaurav',
      profilePic: 'https://via.placeholder.com/40',
      handle: '@user2',
      date: 'Jun 24',
      content: 'This is a sample tweet #2',
      image: '',
    },
    // Add more tweets as needed
  ]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleTweetTextChange = (e) => setTweetText(e.target.value);
  const handleImageChange = (e) => setTweetImage(URL.createObjectURL(e.target.files[0]));

  const handlePostTweet = () => {
    const newTweet = {
      id: tweets.length + 1,
      profilePic: 'https://via.placeholder.com/40',
      name: 'newuser',
      handle: '@newuser',
      date: 'Now',
      content: tweetText,
      image: tweetImage,
    };
    setTweets([newTweet, ...tweets]);
    setTweetText('');
    setTweetImage(null);
    handleClose();
    toast.success('Tweet posted');
  };

  return (
    <div className="home">
      <div className="home-header">
        <h2>Home</h2>
        <Button className='me-2' variant="primary" onClick={handleShow}>
          Tweet
        </Button>
      </div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Tweet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="tweetText">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What's happening?"
                value={tweetText}
                onChange={handleTweetTextChange}
              />
            </Form.Group>
            {tweetImage && (
              <div className="image-preview-container">
                <img src={tweetImage} alt="Selected" className="tweet-image-preview" />
              </div>
            )}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                <FaImage size={24} cursor="pointer" />
                <Form.Control type="file" className="d-none" onChange={handleImageChange} />
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePostTweet}>
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Home;
