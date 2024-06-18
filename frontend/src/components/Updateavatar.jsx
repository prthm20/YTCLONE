import React, { useState } from 'react';
import axios from 'axios';

const Updateavatar = ({cookies}) => {
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('avatar', avatar);
    const accessToken = cookies.accessToken;

    try {
      const response = await axios.patch(
        'https://va-backend-mu.vercel.app/api/v1/users/update-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <div>
      <h2>Update User Avatar</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input 
            type="file" 
         
            onChange={handleFileChange} 
          />
        </div>
        <button type="submit">Upload Avatar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Updateavatar;
