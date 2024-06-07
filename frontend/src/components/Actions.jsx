import React from 'react';
import { Link } from 'react-router-dom';

const Actions = ({ isAuthenticated, setIsAuthenticated, logout }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Actions</h1>
      {!isAuthenticated && <p>First login bro</p>}   
      {isAuthenticated && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded p-4">
            <h3 className="text-xl font-semibold mb-2">Upload</h3>
            <p className="text-gray-700 mb-2">Upload your videos here.</p>
            <Link to="/upload" className="text-blue-500 hover:underline block">Go to Upload</Link>
          </div>

          <div className="border border-gray-300 rounded p-4">
            <h3 className="text-xl font-semibold mb-2">Change Password</h3>
            <p className="text-gray-700 mb-2">Change your account password.</p>
            <Link to="/changepassword" className="text-blue-500 hover:underline block">Change Password</Link>
          </div>

          <div className="border border-gray-300 rounded p-4">
            <h3 className="text-xl font-semibold mb-2">Create Playlist</h3>
            <p className="text-gray-700 mb-2">Create and manage your playlists.</p>
            <Link to="/createplaylist" className="text-blue-500 hover:underline block">Create Playlist</Link>
          </div>
          <div className="border border-gray-300 rounded p-4">
            <h3 className="text-xl font-semibold mb-2">Update Account</h3>
            <p className="text-gray-700 mb-2">Create and manage your playlists.</p>
            <Link to="/updateaccount" className="text-blue-500 hover:underline block">update account</Link>
          </div>
          <div className="border border-gray-300 rounded p-4">
            <h3 className="text-xl font-semibold mb-2">Update image</h3>
            <p className="text-gray-700 mb-2">Update image</p>
            <Link to="/updateimage" className="text-blue-500 hover:underline block">update image</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actions;
