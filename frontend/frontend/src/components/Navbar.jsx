import React from 'react';
import { Link } from 'react-router-dom';

// Navbar component with Logout button
const Navbar = ({ isAuthenticated, setIsAuthenticated, logout }) => {
  // Handler for Logout button click
  const handleLogout = () => {
    // Call the logout function
    logout();
  };

  return (
    <nav className="bg-gray-800 py-4 sticky top-0 z-50">
      {/* Navigation items */}
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">Video App</Link>

        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
          <Link to="/actions" className="text-white hover:text-gray-300">Actions</Link>
         {!isAuthenticated && <Link to="/login" className="text-white hover:text-gray-300">login</Link>}
         {!isAuthenticated && <Link to="/Register" className="text-white hover:text-gray-300">Register</Link>}
          {/* Conditional rendering of Logout button based on authentication status */}
          {isAuthenticated && <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>}
          {/* 
          {isAuthenticated && <Link to="/upload" className="text-white hover:text-gray-300">Upload</Link>}
          */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
