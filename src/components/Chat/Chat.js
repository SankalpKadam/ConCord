import React, { useEffect, useState } from 'react';
import "./Chat.css";
import ChatHeader from './ChatHeader/ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './IndividualMessage/Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import { selectUser } from '../../features/userSlice';
import { Timestamp, addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import firebaseDB from '../../firebase';
import { selectServerId } from '../../features/serverSlice';

function Chat() {
    // Extracting channelName from the Redux store using useSelector
    const channelName = useSelector(selectChannelName);

    // Extracting user information from the Redux store using useSelector
    const user = useSelector(selectUser);

    // Extracting channelId from the Redux store using useSelector
    const channelId = useSelector(selectChannelId);

    // Extracting serverID from the Redux store using useSelector
    const serverID = useSelector(selectServerId);

    // Managing the input state using the useState hook
    const [input, setInput] = useState("");

    // Managing the messages state using the useState hook
    const [messages, setMessages] = useState([]);

    // Asynchronously fetches messages from Firestore, ordering them by timestamp in ascending order, and updates the component state with the retrieved data.

    const getMessages = async () => {
        await getDocs(query(
            collection(firebaseDB, 'servers', serverID, 'server_specific_channels', channelId, 'messages'), orderBy('timeStamp', 'asc')
        )).then(
            (querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMessages(newData);
            }
        ).catch(err => { console.log(err.message); })
    }

    const sendMessage = async (e) => {

        e.preventDefault();

        await addDoc(collection(firebaseDB, 'servers', serverID, 'server_specific_channels', channelId, 'messages'), {
            message: input,
            user: user,
            timeStamp: Timestamp.now().toDate().toUTCString()
        });

        setInput("");
        getMessages();
    }


    useEffect(() => {
        if (channelId) {
            getMessages()
        } else {
            setMessages([])
        }
    }, [channelId])

    return (
        <div className='chat'>

            <ChatHeader channelName={channelName} key={channelId} />

            <div className='chat__messages'>
                {
                    messages.map(msg => <Message user={msg.user} timestamp={msg.timeStamp} message={msg.message} />)
                }
            </div>

            <div className='chat__input'>
                <AddCircleIcon fontSize='large' />
                <form>
                    <input
                        placeholder={`Message #${channelName}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={!channelId} />
                    <button type='submit' className='chat__inputButton' onClick={sendMessage}>Send Message</button>
                </form>

                <div className='chat__inputIcons'>
                    <CardGiftcardIcon fontSize='large' />
                    <GifIcon fontSize='large' />
                    <EmojiEmotionsIcon fontSize='large' />

                </div>
            </div>
        </div>
    )
}

export default Chat;
