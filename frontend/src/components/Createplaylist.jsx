import React, { useState } from 'react';
import axios from 'axios';

const Createplaylist = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post('http://localhost:8000/api/v1/users/createplaylist', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields for playlist name and description */}
          <label className="block">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Name"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Description:</span>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Description"
            />
          </label>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createplaylist;
