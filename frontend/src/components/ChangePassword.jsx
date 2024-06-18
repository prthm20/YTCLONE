import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post('https://va-backend-mu.vercel.app/api/v1/users/change-password', formData, {
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
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields for old password and new password */}
        <label className="block">
          <span className="text-gray-700">Old Password:</span>
          <input
            type="password"
            name="oldpassword"
            value={formData.oldpassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">New Password:</span>
          <input
            type="password"
            name="newpassword"
            value={formData.newpassword}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
