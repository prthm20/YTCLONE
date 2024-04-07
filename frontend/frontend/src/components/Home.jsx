import React from 'react';
import { Link } from 'react-router-dom';
import Getcurrentuser from './Getcurrentuser';

const Home = ({ isAuthenticated, setIsAuthenticated, cookies}) => {
  return (
    <div className="container mx-auto px-4">
      <p className="my-4">
        <Getcurrentuser cookies={cookies}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          <Link to="/dashboard">My Playlists</Link>
        </button><br/>
        <br/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/channelviedeos">My Videos</Link>
        </button>
      </p>
    </div>
  );
};

export default Home;
