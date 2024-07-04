// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';
import Error from './pages/Error.jsx';
import App from './App';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute element={Home} />,
      },
      {
        path: 'explore',
        element: <ProtectedRoute element={Explore} />,
      },
      {
        path: 'profile',
        element: <ProtectedRoute element={Profile} />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/explore',
        element: <ProtectedRoute element={Explore} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
