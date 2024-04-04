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
           // console.log(response.data)
            setComments(response.data.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

   
    
    return (
        <div>
            <h1>Video Comment</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Viedeocomments;



