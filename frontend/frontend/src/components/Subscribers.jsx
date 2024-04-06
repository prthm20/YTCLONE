import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subscribers = ({channelId, cookies }) => {
    const[successmessage,setsuccessmessage]=useState("");
  

  
    const checkSubscription = async () => {
       console.log(cookies)
        const accessToken =cookies.accessToken;
        console.log(accessToken)
const response = await axios.get(`http://localhost:8000/api/v1/users/subscribers/${channelId}`,{headers: {
    Authorization: `Bearer ${accessToken}`,
  }},
 {headers: {
            Authorization: `Bearer ${accessToken}`,

          }})

          setsuccessmessage(response.data.data)
          console.log(response.data.data)
        };

   
        

  return (
    <div>
      
        <button onClick={checkSubscription} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">get subscribers</button>
        {successmessage && <p className="text-green-600 mt-2">{successmessage}</p>}
      
    </div>
  );
}
export default Subscribers;
