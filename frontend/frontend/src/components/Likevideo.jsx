import React, { useState } from 'react'
import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import { Toggle } from './ui/toggle';
const Likevideo = (videoId,cookies) => {
    const[isLiked,setIsLiked]=useState();
    const handleLikeToggle = async () => {
    
        
         console.log(videoId,cookies)
         const viedeoId=videoId.videoId;
         console.log(viedeoId)
            const accessToken = videoId.cookies.accessToken;
            console.log(accessToken)
        const response = await axios.post(`http://localhost:8000/api/v1/users/like/${viedeoId}`,{},{ headers: {
            Authorization: `Bearer ${accessToken}`,
          }});
          setIsLiked(!isLiked);
        }
        
        return(<div>
   
    <button  onClick={handleLikeToggle}><Toggle><ThumbsUp className=' bg-slate-800  fill-slate-400'/></Toggle></button>

  </div>)
}


export default Likevideo
