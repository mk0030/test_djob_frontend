
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import Album from './components/Album';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<UserList />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/album/:albumId" element={<Album />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
