import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Togglesubscribe = ({channelId, cookies }) => {
  
const [subscribed,setsubscribed]=useState();
  

  
    const checkSubscription = async () => {
       console.log(cookies)
        const accessToken =cookies.accessToken;
        console.log(accessToken)
const response = await axios.post(`http://localhost:8000/api/v1/users/subscribe/${channelId}`,{headers: {
    Authorization: `Bearer ${accessToken}`,
  }},
 {headers: {
            Authorization: `Bearer ${accessToken}`,

          }})
          setsubscribed(!subscribed)
          console.log(response)
        };

   
        

  return (
    <div>
      {
        <button onClick={checkSubscription} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
       
      }
    </div>
  );
}
export default Togglesubscribe;
