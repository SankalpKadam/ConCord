import React, { useEffect, useState } from 'react'
import './ChatHeader.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useSelector } from 'react-redux';
import { selectServerId } from '../../../features/serverSlice';
import { selectUser } from '../../../features/userSlice';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore/lite';
import firebaseDB from '../../../firebase';

function ChatHeader(props) {

    //Initializing states and using serverID from redux store
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const serverID = useSelector(selectServerId);

    //Search User function which 
    const searchUser = async (e) => {
        e.preventDefault();
        //get username as per the input
        await getDocs(query(collection(firebaseDB, 'users'), where('userName', '==', input))).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => (doc.data().userName));
            setResult(newData);
        });

        setInput("");
    }

    useEffect(() => {
        setInput("")
        setResult("")
    }, [])

    return (
        <div className='chatHeader'>
            {/* Channel name */}
            <div className='chatHeader__left'>
                <h3>
                    <span className='chatHeader__hash'>#</span> {props.channelName}
                </h3>
            </div>
            {/* User search */}
            <div className='chatHeader__right'>


                <div className='chatHeader__search'>
                    <form>
                        <input placeholder='Search Users in server' disabled={!serverID} value={input} onChange={(e) => setInput(e.target.value)} />
                        <SearchRoundedIcon />

                        <button type='submit' className='chat__inputButton' onClick={searchUser}></button>
                    </form>
                </div>
                
                {
                    result ?
                        <div className='chatHeader__searchResults'>
                            <p>{result}</p>
                        </div> : null
                }


            </div>

        </div>
    )
}

export default ChatHeader
