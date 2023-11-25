import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
 const [user, setUser] = useState({ name: '', email: '' });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/users/', user);
    window.location.reload();
 };

 return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
 );
};

export default CreateUser;