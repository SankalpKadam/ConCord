import React, { useEffect, useState } from 'react';
import './MemberBar.css';
import CircleIcon from '@mui/icons-material/Circle';
import { useSelector } from 'react-redux';
import { selectServerId } from '../../features/serverSlice';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import firebaseDB from '../../firebase';
function MemberBar() {
    const serverID = useSelector(selectServerId);
    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        const memberlist = await getDoc(doc(firebaseDB, 'servers', serverID));
        if (memberlist.exists()) {
            setMembers(memberlist.data().currentMembers)
        } else {
            alert("no member");
        }
    }
    useEffect(()=>{
        if (serverID) {
            getMembers()
        }
    },[serverID])
    return (
        <div className='memberbar'>
            <h4>People</h4>
            {
                members.map(member => 
                    <div className='memberbar__name'>
                    <CircleIcon fontSize='x-small' />
                    <span>{member}</span>
                </div> 
                )
            }
        </div>
    )
}

export default MemberBar;
