import React from 'react';
import './Message.css';
import { Avatar } from '@mui/material';

function Message(props) {
    return (
        <div className='message'>
            <Avatar src={props.user.photo}/>
            <div className='message__info'>
                <h4>{props.user.displayName}
                    <span className='message__timestamp'>

                        {props.timestamp}
                    </span>
                </h4>
                <p>{props.message}</p>
            </div>
        </div>
    )
}

export default Message
