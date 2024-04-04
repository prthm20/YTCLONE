import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Viedeocomments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/users/getcomments/${videoId}`);
            setComments(response.data.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Video Comments</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id} className="border-b py-2">
                        <p className="text-gray-800">{comment.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Viedeocomments;




