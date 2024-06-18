import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addtoplaylist = ({ cookies, videoToAdd }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        const accessToken = cookies.accessToken;
        const response = await axios.get('https://va-backend-mu.vercel.app/api/v1/users/userplaylist', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setPlaylists(response.data.data);
    };

    const addToPlaylist = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.post(`http://localhost:8000/api/v1/users/addtoplaylist/${selectedPlaylist}/${videoToAdd}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setSuccessMessage(response.data.message);
        } catch (error) {
            setErrorMessage('Error adding video to playlist.');
            console.error('Error adding video to playlist:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Add to Playlist</h1>
            <select
                className="border border-gray-300 rounded px-3 py-2 mb-4"
                onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
                <option value="">Select a playlist</option>
                {playlists.map((playlist) => (
                    <option key={playlist._id} value={playlist._id}>{playlist.name}</option>
                ))}
            </select>
            <button
                className=" bg-black   hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={addToPlaylist}
            >
                Add to Playlist
            </button>
            {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 mt-2">Error: {errorMessage}</p>}
        </div>
    );
};

export default Addtoplaylist;
