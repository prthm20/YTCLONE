import React, { useState } from 'react';
import Channel from './Channel';
import Subscribers from './Subscribers';
import Togglesubscribe from './Togglesubscribe';

const Chanprofile = ({ channelId, cookies }) => {
    const [chand, setChand] = useState(false);
    const [khand, setkhand] = useState(false);

    const toggleChannel = () => {
        setChand(!chand);
    };
    const togglekhand = () => {
        setkhand(!khand);
    };

    return (
        <div className="mt-4">
            <button onClick={toggleChannel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Channel
            </button><br/>
          { chand&& <button onClick={togglekhand} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"> more from channel </button>}
            {chand&&<Togglesubscribe cookies={cookies} channelId={channelId} />}
            {chand && <Subscribers channelId={channelId} cookies={cookies} />}
            {khand && <Channel channel={channelId} cookies={cookies} />}

        </div>
    );
};

export default Chanprofile;
