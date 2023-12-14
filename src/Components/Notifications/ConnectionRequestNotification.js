import axios from "axios";
import React, { useEffect, useState } from "react";

export const ConnectionRequestNotification = ({ userId, notification, setNotificationStatusToggled}) => {
    const [sourceUserInfo, setSourceUserInfo] = useState(null);
    const [isSeen, setIsSeen] = useState(false);
    
    useEffect(() => {
        const getUserInfo = async () => {
          if (notification.sourceId) {
          const sourceInfo = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/users/${notification.sourceId}`,
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          setSourceUserInfo({...sourceInfo.data.user});
          }
        };
        getUserInfo();
    }, []);

    const acceptReq = async () => {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/connections/`,
            { 
                requesterId: notification.sourceId,
                requestedId: userId,
                status: 'confirmed'
            },
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/notifications/${notification.id}`,
            { 
                hasBeenViewed: true
            },
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          setNotificationStatusToggled(true)
          setIsSeen(true);       
    }

    const deleteReq = async () => {
        await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/connections/${notification.sourceId}/${userId}`,
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/notifications/${notification.id}`,
            { 
                hasBeenViewed: true
            },
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          setNotificationStatusToggled(true)
          setIsSeen(true);
    }

    if(!isSeen) {
    return (
        <div className="flex flex-row">
            <div className="aspect-square mr-[1em] rounded-[50%] overflow-hidden h-[5em] w-[6em]">
                <img
                    src={sourceUserInfo ? sourceUserInfo.profilePictureUrl : null}
                    alt="face"
                    className="h-[100%] w-[100%] object-cover"
                />
            </div>
            <div className="flex flex-col">
                {sourceUserInfo ? <p>{`${sourceUserInfo.fullName} has requested to connect with you.`}</p> : null}
                <div className="flex flex-row">
                    <button
                    className = 'p-2 bg-green-300 rounded-[25%] cursor-pointer'
                        id={`accept-connect-${notification.sourceId}`}
                        onClick={() => acceptReq()}
                    > Accept </button>
                    <button
                    className = 'p-2 bg-red-300 rounded-[25%] cursor-pointer'
                        id={`delete-connect-${notification.sourceId}`}
                        onClick={() => deleteReq()}
                    > Delete </button>
                </div>
            </div>
        </div>  
    );
   }
};
