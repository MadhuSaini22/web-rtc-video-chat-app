import React, {useContext} from 'react';
import {Button } from '@material-ui/core';

import {SocketContext} from '../SocketContext';
const Notifications = () => {
    const { answerCall ,call,callAccepted} = useContext(SocketContext);

    return (
       <>
         {call.isReceivedCall && !callAccepted && (
             <div style={{display: 'flex',justifyContent: 'space-around'}}>
                 <h1>{call.name} is calling:</h1>
                 <Button varient="contained" color="primary" onClick={answerCall}>
                     Answer
                 </Button>
             </div>
         )}
       </>
    );
};

export default Notifications;
