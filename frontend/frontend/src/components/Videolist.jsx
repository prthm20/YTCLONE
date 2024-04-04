import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteVideo from './DeleteViedeo';
import Commentviedeo from './Commetnviedeo';


const VideoList = ({ isAuthenticated, setIsAuthenticated,cookies }) => {
    const [videos, setVideos] = useState([]);
   

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const accessToken=cookies.accessToken
            const response = await axios.get('http://localhost:8000/api/v1/users/channelviedeos',{headers: {
                Authorization: `Bearer ${accessToken}`
          }
      });
            setVideos(response.data.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };
   

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Video List</h1>
            <div className='border-2 border-blue-950'>

            {videos.map(video => (
                <div key={video._id} className='border-2 border-blue-950'>
                    <h3>{video.title}</h3>
                    
                    <p>{video.description}</p>
                    <video controls className='border-2 border-blue-950'>
                        <source src={video.viedeoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <a href={video.viedeoFile} target="_blank" rel="noopener noreferrer">Watch Video</a>
                    
                    <DeleteVideo videoId={video._id} />
                    <Commentviedeo videoId={video._id} cookies={cookies} />
            
                </div>
            ))}
           

            </div>
        </div>
    );
};

export default VideoList;
