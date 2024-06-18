import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeletePlaylist from './DeletePlaylist';
import Removefromplaylist from './Removefromplaylist';

const Dashboard = ({ cookies }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const accessToken = cookies.accessToken;

            const response = await axios.get('http://localhost:8000/api/v1/users/userplaylist', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setPlaylists(response.data.data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    const fetchVideosForPlaylist = async (playlistId) => {
        try {
            const accessToken = cookies.accessToken;
            const playlistResponse = await axios.get(`https://va-backend-mu.vercel.app/api/v1/users/playlistbyid/${playlistId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const playlistVideos = await Promise.all(
                playlistResponse.data.data.viedeo.map(async (videoId) => {
                    const videoResponse = await axios.get(`https://va-frontend.vercel.app/api/v1/users/viedeos/${videoId}`, {   headers: { Authorization: `Bearer ${accessToken}` } });
                    return videoResponse.data.data;
                })
            );
            setVideos(playlistVideos);
        } catch (error) {
            console.error('Error fetching videos for playlist:', error);
        }
    };

    const handlePlaylistClick = (playlistId) => {
        setSelectedPlaylist(playlistId);
        fetchVideosForPlaylist(playlistId);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">My Playlists</h1>
            <ul className="grid grid-cols-3 gap-4">
                {playlists.map((playlist) => (
                    <li key={playlist._id} onClick={() => handlePlaylistClick(playlist._id)} className="border p-2 cursor-pointer hover:bg-gray-100">
                        {playlist.name}
                        <DeletePlaylist playlistId={playlist._id} cookies={cookies}/>
                    </li>
                ))}
            </ul>
            {selectedPlaylist && (
                <div>
                    <h2 className="text-xl font-bold my-4">Videos in {playlists.find((playlist) => playlist._id === selectedPlaylist)?.name}</h2>
                    <ul className="grid grid-cols-2 gap-4">
                        {videos.map((video) => (
                            <li key={video._id} className="border p-2">
                                <p className="font-semibold">{video.title}</p>
                                <video controls className="border-2 border-blue-950">
                                    <source src={video.viedeoFile} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <a href={video.viedeoFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mt-2">Watch Video</a>
                                <Removefromplaylist playlistId={selectedPlaylist} videoId={video._id} cookies={cookies}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;