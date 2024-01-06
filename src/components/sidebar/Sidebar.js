import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from "@mui/icons-material/Add";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarChannel from './ChannelList/SidebarChannel';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { getAuth, signOut } from 'firebase/auth';
import firebaseDB from '../../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { selectServerId, selectServerName } from '../../features/serverSlice';


function Sidebar() {
  const user = useSelector(selectUser);
  const serverID = useSelector(selectServerId);
  const serverName = useSelector(selectServerName);
  const [channels, setChannels] = useState([]);

  const getChannels = async () => {
    await getDocs(collection(firebaseDB, 'servers', serverID, 'server_specific_channels')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChannels(newData);
      // console.log("serv", newData);
    })
  }

  useEffect(() => {
    if (serverID) {
      getChannels();
    }
  }, [serverID])

  const addToCollection = async (channelName) => {

    await addDoc(collection(firebaseDB, 'servers', serverID, 'server_specific_channels'), {
      channelName: channelName
    })
    await getChannels()
  }

  const handleAddChannel = () => {
    const channelName = prompt("Enter new channel name");
    if (channelName && serverID) {
      addToCollection(channelName)
    }
    else{
      alert("Select a server first")
    }
  }

  return (
    <div className='sidebar'>

      <div className='sidebar__top'>
        <h3>
          {serverName?serverName:"Select Server"}
          <h5>{serverID}</h5>
        </h3>
        <ExpandMoreIcon />
      </div>


      <div className='sidebar__channels'>

        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>

        <div className='sidebar_channelsList'>

          {
            channels.map(channel =>
              <SidebarChannel channel={channel.channelName} key={channel.id} id={channel.id} />
            )
          }

        </div>

      </div>


      <div className='sidebar__voice'>

        <SignalCellularAltIcon
          className='sidebar__voiceIcon'
          fontSize='large'
        />

        <div className='sidebar__voiceInfo'>
          <h3>
            Voice Connected
          </h3>
          <p>Stream</p>
        </div>

        <div className='sidebar__voiceIcons'>
          <InfoOutlinedIcon />
          <CallIcon />
        </div>

      </div>

      <div className='sidebar__profile'>
        <Avatar src={user.photo} onClick={() => {
          signOut(getAuth()).then(
            () => { console.log("logged out successfully"); }
          ).catch(err => {
            console.log(err.message);
          })
        }} />
        <div className='sidebar__profileInfo'>
          <h3>
            @{user.displayName}
          </h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className='sidebar__profileIcons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>

    </div>
  )
}

export default Sidebar;
