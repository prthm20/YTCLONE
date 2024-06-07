import React, { useState } from 'react';
import axios from 'axios';



const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    avatar: null, // File input
  });

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      // Handle file input separately
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', formData.avatar);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register', data);
      console.log(response.data);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error.message);
      setErrorMessage('Registration error !recheck credentials ');
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
       {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Full Name:
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block">
          Avatar:
          <input
            type="file"
            name="avatar"
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
     
    </div>
  );
};

export default RegisterForm;
