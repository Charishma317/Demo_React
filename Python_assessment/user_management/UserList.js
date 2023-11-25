import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
 const [users, setUsers] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8000/users/');
      setUsers(result.data);
    };

    fetchData();
 }, []);

 const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}/`);
    setUsers(users.filter((user) => user.id !== id));
 };

 const handleSearch = (event) => {
    setSearchTerm(event.target.value);
 };

 const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
      <button onClick={() => createUser()}>Create New User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 );
};

export default UserList;