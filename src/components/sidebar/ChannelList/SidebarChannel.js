import React from 'react';
import "./SidebarChannel.css";
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../../../features/appSlice';

function SidebarChannel(props) {
  const dispatch = useDispatch();

  return (
    <div className='sidebarChannel' onClick={()=> {
      dispatch(setChannelInfo({
        channelId: props.id,
        channelName: props.channel
      }))
    }}>
      <h4>
        <span className='sidebarChannel__hash'>#</span>{props.channel}

      </h4>
    </div>
  )
}

export default SidebarChannel;
