import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Commentviedeo from './Commetnviedeo';
import Viedeocomments from './Viedeocomments';
import Addtoplaylist from './Addtoplaylist';
import Togglesubscribe from './Togglesubscribe';
import Subscribers from './Subscribers';
import Subscribed from './Subscribed';
import Chanprofile from './Chanprofile';
import Likevideo from './Likevideo';

const Allviedeos = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
    const [videos, setVideos] = useState([]);
    const [com, setCom] = useState(false);
    const [atp, setAtp] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.get('http://localhost:8000/api/v1/users/getall');
            setVideos(response.data.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const comm = () => {
        setCom(!com);
    };

    const atpp = () => {
        setAtp(!atp);
    };

    return (
        <div className='container mx-auto py-8'>
            <h1 className='text-3xl font-bold mb-6'>All Videos</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {videos.map(video => (
                    <div key={video._id} className='border border-gray-300 rounded p-4'>
                        <h3 className='text-xl font-semibold mb-2'>{video.title}</h3>
                        <p className='text-gray-700 mb-2'>{video.description}</p>
                        <video controls className='w-full rounded-lg'>
                            <source src={video.viedeoFile} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                        <a href={video.viedeoFile} target='_blank' rel='noopener noreferrer' className='text-black-500 hover:underline block mb-2'>Watch Video</a>
                        <button onClick={comm} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>comments</button>
                        {com && <Commentviedeo videoId={video._id} cookies={cookies} />}
                        {com && <Viedeocomments videoId={video._id} />}
                        <button onClick={atpp} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>addto playlist</button>
                        {atp && <Addtoplaylist cookies={cookies} videoToAdd={video._id} />}
                        <Chanprofile cookies={cookies} channelId={video.owner} />
                        <Likevideo videoId={video._id} cookies={cookies}/>
                    </div>
                ))}
                        </div>
<Subscribed cookies={cookies} />
        </div>
    );
};

export default Allviedeos;
