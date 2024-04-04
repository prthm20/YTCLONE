// DeleteVideo.js
import React from 'react';
import axios from 'axios';

const DeleteVideo = ({ videoId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/users/videos/${videoId}`);
            console.log('Video deleted successfully');
            // Optionally, update the UI or perform any other action after deletion
        } catch (error) {
            console.error('Error deleting video:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Delete Video
        </button>
    );
};

export default DeleteVideo;
