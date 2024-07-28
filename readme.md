# Twitter Clone Project

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a clone of Twitter, developed using MERN stack(MongoDb, Express.js, React.js, Node.js) . It includes features like user authentication, tweeting, following users, liking, and retweeting tweets. The project is divided into Client and Server which manages frontend (using react, sass and js) and backend (using express.js and node.js, and MongoDB as database) respectively.

## Features

### User Authentication

- **Registration**: Users can create a new account by providing their details.
- **Login**: Existing users can log in with their email and password.
- **Logout**: Users can securely log out of their accounts.

### Home Page

- **Tweet Feed**: Displays a feed of tweets from followed users.
- **Tweet Actions**: Users can like, retweet, and reply to tweets.
- **Compose Tweet**: Users can create and post new tweets.

### Sidebar

- **Navigation**: Quick links to Home, Explore, Notifications, and Profile pages.
- **User Profile**: Displays the logged-in user's profile picture and name at the bottom.

### Profile Page

- **User Information**: Displays user details including name, username, bio, and location.
- **User Tweets**: Shows the tweets and replies by the user.
- **Edit Profile**: Users can update their profile information and upload a profile picture.

### Backend

- **User Management**: Handles user registration, login, profile update, and retrieval.
- **Tweet Management**: Manages creating, liking, retweeting, and replying to tweets.
- **Authentication**: Secures endpoints using JWT authentication.

### Frontend

- **React**: The application is built using React for a responsive and dynamic user experience.
- **Sass**: Styles are managed using Sass for modular and reusable CSS.

## Screenshots

### Login Page

![Login Page](screenshots/LoginPage.png)

### Registration Page

![Registration Page](./screenshots/RegistrationPage.png)

### Home Page

![Home Page](./screenshots/HomePage.png)

### Profile Page

![Profile Page](./screenshots/ProfilePage.png)
![Other person's Profile Page](./screenshots/OtherPersonProfilePage.png.png)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/twitter-clone.git
   cd twitter-clone
   ```
