import React from 'react';
import './SingleServer.css';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setServerInfo } from '../../../features/serverSlice';
import { setChannelInfo } from '../../../features/appSlice';


function SingleServer(props) {
    const dispatch = useDispatch();
    const handleServerChange =()=>{
        dispatch(setServerInfo({
            serverId: props.id,
            serverName: props.name
        }))
        dispatch(setChannelInfo({
            channelId: null,
            channelName: null,
          }))
    }
  return (
    <div className='serverbar__singleserver'>

        <Avatar src={props.photo} fontSize='large' onClick={handleServerChange}/>
      
    </div>
  )
}

export default SingleServer
