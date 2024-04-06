import React from 'react'
import Channel from './Channel'
import Subscribers from './Subscribers'

const Chanprofile = ({channelId,cookies}) => {
  return (
    <div>
      <Channel channel={channelId} cookies={cookies}/>
      <Subscribers channelId={channelId} cookies={cookies}/>
    </div>
  )
}

export default Chanprofile
