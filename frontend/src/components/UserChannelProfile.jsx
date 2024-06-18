import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserChannelProfile = ({ username ,cookies}) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        console.log(cookies)
        const accessToken = cookies.cookies.accessToken;
        const response = await axios.get(`https://va-backend-mu.vercel.app/api/v1/users/c/${username}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setChannel(response.data.data);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };

    fetchChannel();
  }, [username]);

  if (!channel) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{channel.fullname}</h1>
      <p>Username: {channel.username}</p>
      <p>Email: {channel.email}</p>
      <p>Subscriber Count: {channel.subscribercount}</p>
      {/* Add more profile information as needed */}
    </div>
  );
};

export default UserChannelProfile;
