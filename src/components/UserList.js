
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('https://jsonplaceholder.typicode.com/users');
      const usersWithDetails = await Promise.all(result.data.map(async user => {
        const todos = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`);
        const albums = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`);
        return {
          ...user,
          nbTodos: todos.data.length,
          nbAlbums: albums.data.length
        };
      }));
      setUsers(usersWithDetails);
    }
    fetchData();
  }, []);

  return (
    <div className="user-list">
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Website</th>
            <th>Company</th>
            <th>Nb Todos</th>
            <th>Nb Albums</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
              <td>{user.email}</td>
              <td><a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></td>
              <td>{user.company.name}</td>
              <td>{user.nbTodos}</td>
              <td>{user.nbAlbums}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
