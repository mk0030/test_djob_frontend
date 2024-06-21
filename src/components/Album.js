
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Album.css';

function Album() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const albumResult = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
      setAlbum(albumResult.data);

      const photosResult = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      setPhotos(photosResult.data);
    }
    fetchData();
  }, [albumId]);

  return (
    <div className="album">
      <h1>{album.title}</h1>
      <div className="photos">
        {photos.map(photo => (
          <div key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </div>
        ))}
      </div>
      <Link to={`/user/${album.userId}`}>Back to User Profile</Link>
    </div>
  );
}

export default Album;
