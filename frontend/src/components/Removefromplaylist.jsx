import React, { useState } from 'react';
import axios from 'axios';

const Removefromplaylist = ({ playlistId, videoId ,cookies}) => {
  const [message, setMessage] = useState('');

  const handleRemoveVideo = async () => {
    try {
        const accessToken = cookies.accessToken;
      const response = await axios.delete(`http://localhost:8000/api/v1/users/removefromplaylist/${playlistId}/${videoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      setMessage(response.data.message); // Assuming your backend sends a message
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={handleRemoveVideo}>Remove Video from Playlist</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Removefromplaylist;
