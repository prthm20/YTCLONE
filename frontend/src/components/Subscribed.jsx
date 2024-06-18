
import React, { useState } from 'react';
import axios from 'axios';

const Subscribed = ({ cookies }) => {
  const [subscribedTo, setSubscribedTo] = useState('');

  const checkSubscribed = async () => {
    const accessToken = cookies.accessToken;
    try {
      const response = await axios.get(`https://va-backend-mu.vercel.app/api/v1/users/subscribed`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      console.log(response.data.data);
      setSubscribedTo(response.data.data);
    } catch (error) {
      console.error('Error fetching subscribed data:', error);
    }
  };

  return (
    <div className=" mt-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded" onClick={checkSubscribed}>Subscribed to</button>
      {subscribedTo && <p className="text-green-600 mt-2">{subscribedTo}</p>}
    </div>
  );
};

export default Subscribed;
