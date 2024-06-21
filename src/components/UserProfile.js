
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userResult = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUser(userResult.data);

      const albumsResult = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
      setAlbums(albumsResult.data);
    }
    fetchData();
  }, [userId]);

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Back to User List</Link>
    </div>
  );
}

export default UserProfile;
