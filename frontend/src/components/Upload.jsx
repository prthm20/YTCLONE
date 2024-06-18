import React, { useState } from 'react';
import axios from 'axios';

const Upload = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
  const [formData, setFormData] = useState({
    title: '',
    viedeoFile: null, // File input
  });

  const handleChange = (e) => {
    if (e.target.name === 'viedeoFile') {
      // Handle file input separately
      setFormData({ ...formData, viedeoFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('viedeoFile', formData.viedeoFile);

    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post('https://va-backend-mu.vercel.app/api/v1/users/publish', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error('Error during upload:', error.message);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input field for title */}
        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        {/* File input for video */}
        <label className="block">
          <span className="text-gray-700">Video:</span>
          <input
            type="file"
            name="viedeoFile"
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
