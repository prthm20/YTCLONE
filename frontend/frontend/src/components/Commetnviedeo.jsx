import React, { useState } from 'react';
import axios from 'axios';

const Commentviedeo = ({ videoId,cookies }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    content: '',
    
  });

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    
      // Make a login request to the server
      const accessToken=cookies.accessToken
      const response = await axios.post(`http://localhost:8000/api/v1/users/addcomments/${videoId}`, formData,{headers: {
        Authorization: `Bearer ${accessToken}`}});
     
    
     
  };

  return (
    <div>
      <h2></h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for email and password */}
        <input type="text" name="content" value={formData.comment} onChange={handleChange} placeholder='comment'/>
    

        {/* Submit button */}
        <button type="submit">post</button>
      </form>
    </div>
  );
};

export default Commentviedeo;
