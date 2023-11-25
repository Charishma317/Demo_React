import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListView = () => {
 const [users, setUsers] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
    fetchUsers();
 }, []);

 const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8000/users/');
    setUsers(res.data);
 };

 const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}/`);
    fetchUsers();
 };

 const handleSearch = (e) => {
    setSearchTerm(e.target.value);
 };

 const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
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

export default ListView;