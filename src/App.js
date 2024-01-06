import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.js';
import Chat from './components/Chat/Chat.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice.js';
import Login from './components/Login/Login.js';
import { getAuth } from 'firebase/auth';
import { login, logout } from './features/userSlice.js'
import ServerBar from './components/ServerBar/ServerBar.js';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore/lite';
import firebaseDB from './firebase.js';
import { setChannelInfo } from './features/appSlice.js';
import { setServerInfo } from './features/serverSlice.js';
import MemberBar from './components/MemberBar/MemberBar.js';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  const addUserToCollection = async (authUser) => {
    // Check if the user exists
    const userDocSnapshot = await getDoc(doc(firebaseDB, 'users', authUser.uid));
    if (userDocSnapshot.exists()) {
      console.log(userDocSnapshot.data().servers);
    }
    else {
      await setDoc(doc(collection(firebaseDB, 'users'), authUser.uid), {
        userID: authUser.uid,
        userName: authUser.displayName,
        servers: []
      })
    }
  }
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        addUserToCollection(authUser)
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );

      }
      else {
        console.log("user logged out");
        dispatch(setChannelInfo({
          channelId: null,
          channelName: null,
        }))
        dispatch(setServerInfo({
          serverId: null,
          serverName: null
        }))
        dispatch(logout());
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      {
        user ? <>
          <ServerBar />
          <Sidebar />
          <Chat />
          <MemberBar />
        </> :
          <Login />

      }
    </div>
  );
}

export default App;
