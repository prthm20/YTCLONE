import React, { useState } from 'react';
import axios from 'axios';

const Commentviedeo = ({ videoId, cookies }) => {
    const [successMessage, setSuccessMessage] = useState('');
    // State to manage form data
    const [formData, setFormData] = useState({
        content: '',
    });

    // Handler for form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a login request to the server
        const accessToken = cookies.accessToken;
        await axios.post(`https://va-backend-mu.vercel.app/api/v1/users/addcomments/${videoId}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setSuccessMessage("comment added");

        // Clear form data after submission
        setFormData({ content: '' });
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4">Add Comment</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                {/* Input field for comment */}
                <input
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter your comment"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />

                {/* Submit button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                    Post Comment
                </button>
            </form>
            {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
            
        </div>
    );
};

export default Commentviedeo;
