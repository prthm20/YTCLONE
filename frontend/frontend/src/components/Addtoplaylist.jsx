import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addtoplaylist = ({ cookies,videoToAdd }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        const accessToken=cookies.accessToken
        
            const response = await axios.get('http://localhost:8000/api/v1/users/userplaylist',{headers: {
                Authorization: `Bearer ${accessToken}`
            }
            })
            console.log(response);
                    setPlaylists(response.data.data);
                }
                
                const addToPlaylist = async () => {
                    console.log(selectedPlaylist);
                    console.log(videoToAdd);
                    try {
                        const accessToken=cookies.accessToken
                        const response = await axios.post(`http://localhost:8000/api/v1/users/addtoplaylist/${selectedPlaylist}/${videoToAdd}`,{headers: {
                            Authorization: `Bearer ${accessToken}`}
                        });
            setSuccessMessage(response.data.message);
        } catch (error) {
            setErrorMessage('Error adding video to playlist.');
            console.error('Error adding video to playlist:', error);
        }
    };
        
        return (
            <div>
            <h1>Add to Playlist</h1>
            <select onChange={(e) => setSelectedPlaylist(e.target.value)}>
                <option value="">Select a playlist</option>
                {playlists.map(playlist => (
                    <option key={playlist._id} value={playlist._id}>{playlist.name}</option>
                    ))}
            </select>
            <button onClick={addToPlaylist}>Add to Playlist</button>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
        </div>
    );
    
    
};
export default Addtoplaylist;
