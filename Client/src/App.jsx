import React from 'react';
import Sidebar from './components/Sidebar';
import './sass/App.scss';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default App;
