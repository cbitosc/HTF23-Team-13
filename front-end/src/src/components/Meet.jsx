import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

export default function Meet() {
    const { meetId } = useParams();
    console.log(meetId);
    const myMeeting = async (element) => {
        const appID = 814650770;
        const serverSecret = "8a271e4717ccdaa3814fa42a0f9aaa23";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,meetId,Date.now().toString(),'teja');

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
