import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserChannelProfile from './UserChannelProfile';
import Togglesubscribe from './Togglesubscribe';

const Getcurrentuser = (cookies) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(cookies)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken =cookies.cookies.accessToken;
        console.log(accessToken)
        const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response)
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {currentUser.username}</h1>
      <p>Email: {currentUser.email}</p>
      <p>Full Name: {currentUser.fullname}</p>
      {/* Add more user information as needed */}
      <p>{currentUser._id}</p>
      
    </div>
  );
};

export default Getcurrentuser;
