import React, { useState } from 'react';
import axios from 'axios';

const Updateaccount = (cookies) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const accessToken =cookies.cookies.accessToken;
      const response = await axios.patch(`http://localhost:8000/api/v1/users/update-account`, {
        fullname,
        email
      },{headers: {
        Authorization: `Bearer ${accessToken}`,

      }});
      console.log(response)
      
      if (response.status === 200) {
        setMessage('Account details updated successfully');
      }
    
  };

  return (
    <div>
      <h2>Update Account Details</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input 
            type="text" 
            id="fullname" 
            value={fullname} 
            onChange={(e) => setFullname(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit">Update Details</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Updateaccount;
