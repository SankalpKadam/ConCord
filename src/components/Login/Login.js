import React from 'react';
import "./Login.css";
import { Button } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from '../../firebase';
function Login() {
const signIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
};
  return (
    <div className='login'>
        <div className='login__logo'>
            <img src='https://1000logos.net/wp-content/uploads/2021/06/Discord-logo-500x281.png'/>
        </div>

        <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login
