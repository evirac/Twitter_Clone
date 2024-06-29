import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';
import Error from './pages/Error.jsx';
import App from './App';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/explore',
        element: <Explore />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);