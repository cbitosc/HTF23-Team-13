import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authService from '../services/authService';
import UserService from '../services/userServices';

export default function Meet() {
  const navigate = useNavigate();
    const { eventId } = useParams();
    const [currentUser,setCurrentUser] = useState(undefined);
    const [userEvents,setUserEvents] = useState([]);
    const [meetId, setMeetId] = useState(undefined);
    useEffect(()=>{
      const user = authService.getCurrentUser();
      if (user) {
          setCurrentUser(user);
          const userId= user.user.userId;
          axios.post("http://127.0.0.1:3000/userEvents",{userId}).then(res=>{
          setUserEvents(res.data);
      })
      }
      var flag = true;
      for(let i=0;i<userEvents.length;i++) {
        if(userEvents[i] === eventId) {
          flag = false;
        }
      }
      if(!flag) {
        navigate("/");
        window.location.reload();
      }
      
  },[]);
  UserService.getEventDetails(eventId).then((res) => {
      setMeetId(res.data.streamId);
  })
    const myMeeting = async (element) => {
        const appID = 814650770;
        const serverSecret = "8a271e4717ccdaa3814fa42a0f9aaa23";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,"rg",Date.now().toString(),'teja');

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario : {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
            },
        });
    };
  return (
    <div>
      <div ref={myMeeting }/>
    </div>
  )
}
