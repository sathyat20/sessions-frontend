import axios from "axios";
import React, { useEffect, useState } from "react";

export const GroupAddNotification = ({ notification, setNotificationStatusToggled}) => {
    const [sourceUserInfo, setSourceUserInfo] = useState(null);
    const [sourceGroupInfo, setSourceGroupInfo] = useState(null);
    const [isSeen, setIsSeen] = useState(notification.hasBeenViewed);
    
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

        const getGroupInfo = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/groups/group/${notification.details}`,
              {
                headers: { Authorization: localStorage.getItem("token") },
              }
            );
            setSourceGroupInfo(response.data)
          }

        getUserInfo();
        getGroupInfo();

    }, []);

    const dismissNotification = async() => {
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
        {console.log(notification)}
            <div className="aspect-square mr-[1em] rounded-[50%] overflow-hidden h-[5em] w-[6em]">
                <img
                    src={sourceGroupInfo ? sourceGroupInfo.profilePictureUrl : null}
                    alt="face"
                    className="h-[100%] w-[100%] object-cover"
                />
            </div>
            <div className="flex flex-col">
                {sourceUserInfo && sourceGroupInfo ? <p>{`${sourceUserInfo.fullName} has added you to ${sourceGroupInfo.groupName}.`}</p> : null}
                <div className="flex flex-row">
                    <button
                    className = 'p-2 bg-blue-300 rounded-[25%] cursor-pointer'
                        id={`dismiss-${notification.sourceId}`}
                        onClick={() => dismissNotification()}
                    > Dismiss </button>     
                </div>
            </div>
        </div>  
    );
   }
};
