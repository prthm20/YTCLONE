import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated, setCookies }) => {
  // State to manage form data
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a login request to the server
      const response = await axios.post('http://localhost:8000/api/v1/users/login', formData);
      
      if (response.data && response.data.data) {
        // Set tokens in cookies upon successful login
        setSuccessMessage(response.data.message);

        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshtoken;
        setCookies('accessToken', accessToken, { path: '/' });
        setCookies('refreshToken', refreshToken, { path: '/' });
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrorMessage('login error !recheck credentials ');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
       {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields for email, password, and username */}
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        />

       
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
