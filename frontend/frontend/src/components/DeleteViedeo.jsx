// DeleteVideo.js
import React from 'react';
import axios from 'axios';

const DeleteVideo = ({ videoId }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/users/viedeos/${videoId}`);
            console.log('Video deleted successfully');
            // Optionally, update the UI or perform any other action after deletion
        } catch (error) {
            console.error('Error deleting video:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <button onClick={handleDelete}>Delete Video</button>
    );
};

export default DeleteVideo;
