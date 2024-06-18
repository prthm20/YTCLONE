import React from 'react';
import axios from 'axios';

const DeletePlaylist = ({ playlistId,cookies }) => {
    const handleDelete = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.delete(`https://va-backend-mu.vercel.app/api/v1/users/deleteplaylist/${playlistId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
        } catch (error) {
            console.error('Error deleting playlist:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <button
            onClick={handleDelete}
            className=" bg-slate-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5"
        >
            Delete playlist
        </button>
    );
};

export default DeletePlaylist;
