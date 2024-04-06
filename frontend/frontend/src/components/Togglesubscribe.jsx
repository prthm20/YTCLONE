import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Togglesubscribe = ({channelId, cookies }) => {
  

  

  
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

          console.log(response)
        };

   
        

  return (
    <div>
      {
        <button onClick={checkSubscription}>Unsubscribe</button>
       
      }
    </div>
  );
}
export default Togglesubscribe;
