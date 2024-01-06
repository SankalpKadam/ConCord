import React, { useEffect, useState } from 'react';
import "./ServerBar.css";
import SingleServer from './IndividualServer/SingleServer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore/lite';
import firebaseDB from '../../firebase';
import { useSelector } from 'react-redux';
import { selectServerId } from '../../features/serverSlice';
import { selectUser } from '../../features/userSlice';
function ServerBar() {

  const serverID = useSelector(selectServerId);
  const user = useSelector(selectUser);

  const [userServers, setServers] = useState([])
  const [retrieve, setRetrieve] = useState(true)
  const addServer = async (serverName, img_url) => {
    const newlyAdded = await addDoc(collection(firebaseDB, 'servers'), {
      serverName: serverName,
      serverLogo: img_url,
      currentMembers: [user.displayName]
    })
    console.log(newlyAdded.id);
    const serverList = await getDoc(doc(firebaseDB, "users", user.uid))
    if (serverList.exists()) {
      await updateDoc(doc(firebaseDB, 'users', user.uid), {
        servers: arrayUnion(newlyAdded.id)
      }
      )
    } else {
      alert("user does not exist");
    }
    setRetrieve(true)
  }

  const handleAddServer = () => {
    const serverName = prompt("Enter server name");
    const img_url = prompt("Enter image URL");
    if (serverName && img_url) {
      addServer(serverName, img_url)
    }
  }
  const getIndividualServers = (servers) => {
    
    return new Promise(async (resolve, reject) => {
      try {
        var serverUsers = [];
        const promises = servers.map(async (element) => {
          const serverData = await getDoc(doc(firebaseDB, 'servers', element));
          if (serverData.exists()) {
            serverUsers.push({...serverData.data(), id: element});
          } else {
            alert("Server not found");
          }
        });
    
        // Wait for all promises to resolve
        await Promise.all(promises);
    
        // console.log("Server Users:", serverUsers);
        setServers(serverUsers);
        resolve(serverUsers);
      } catch (error) {
        // console.error("Error:", error.message);
        reject(error);
      }
    });
    
  }
  const getServers = async () => {
    const serverList = await getDoc(doc(firebaseDB, "users", user.uid))
    if (serverList.exists()) {
      await getIndividualServers(serverList.data().servers)

    } else {
      console.log("user does not exist");
    }

  }

  const handleAddUser = () => {
    const getServerID = prompt("Enter Server ID to join")
    if (getServerID) {
      addUserToServer(getServerID)
    }
  }

  const addUserToServer = async (getServerID) => {
    const serverList = await getDoc(doc(firebaseDB, "users", user.uid))
    if (serverList.exists()) {
      await updateDoc(doc(firebaseDB, 'users', user.uid), {
        servers: arrayUnion(getServerID)
      }
      )
    } else {
      alert("user does not exist");
    }


    const memberList = await getDoc(doc(firebaseDB, "servers", getServerID))
    if (memberList.exists()) {
      await updateDoc(doc(firebaseDB, 'servers', getServerID), {
        currentMembers: arrayUnion(user.displayName)
      }
      )
    } else {
      alert("user does not exist");
    }
    setRetrieve(true)
  }

  useEffect(() => {
    if(retrieve){
      getServers();
      setRetrieve(false)
    }
  }, [retrieve])


  return (
    <div className='serverbar'>
      <div className='serverbar__addserver'>
        <AddCircleOutlineIcon fontSize='large' onClick={handleAddServer} />
        <GroupAddIcon fontSize='large' onClick={handleAddUser} />
      </div>


      <div className='serverbar__image'>
        {
          userServers.map((server) =>
            <SingleServer photo={server.serverLogo} key={server.id} id={server.id} name={server.serverName} />
          )
        }
      </div>
    </div>
  )
}

export default ServerBar;
