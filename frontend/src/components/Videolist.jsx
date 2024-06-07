import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteVideo from './DeleteViedeo';
import Commentviedeo from './Commetnviedeo';
import Viedeocomments from './Viedeocomments';
import Deletemycomments from './Deletemycomments';

const VideoList = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.get(`http://localhost:8000/api/v1/users/channelviedeos`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setVideos(response.data.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Video List</h1>
            <div className="border-2 border-blue-950">
                {videos.map(video => (
                    <div key={video._id} className="border-2 border-blue-950 p-4 rounded-lg mb-4">
                        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                        <p className="text-gray-700 mb-2">{video.description}</p>
                        <video className="border border-blue-950 rounded-lg" controls>
                            <source src={video.viedeoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <a
                            href={video.viedeoFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-500 hover:underline mt-2"
                        >
                            Watch Video
                        </a>
                        <div className="mt-2">
                            <DeleteVideo videoId={video._id} />
                         {/*   <Viedeocomments videoId={video._id} />*/}
                            <Deletemycomments videoId={video._id} cookies={cookies}/>

                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoList;
