import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isAuthenticated, setIsAuthenticated, logout }) => {
  return (
    <div className="container mx-auto px-4">
      <p className="my-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          <Link to="/dashboard">My Playlists</Link>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/channelviedeos">My Videos</Link>
        </button>
      </p>
    </div>
  );
};

export default Home;
