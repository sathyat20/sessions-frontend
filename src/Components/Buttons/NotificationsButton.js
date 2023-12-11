import { BellIcon } from "@heroicons/react/20/solid";
import {NotificationsModal} from './NotificationsModal'
import axios from "axios";
import React, { useEffect, useState } from "react";

export function NotificationsButton({userId}) {
    const [notificationsModalToggle, setNotificationsModalToggle] = useState(false);
    const [notifications, setNotifications] = useState([])
    const [notificationReadStatus, setNotificationReadStatus] = useState(true)
    const [notificationStatusToggled, setNotificationStatusToggled] = useState(false)

    useEffect(() => {
        const getNotifications = async () => {
            const retrievedNotifications = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/notifications/`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            const readStatus = retrievedNotifications.data.notifications.reduce((acc, notification)=>{
              return acc && notification.hasBeenViewed
            }, true)
            setNotificationReadStatus(readStatus)
            setNotifications([...retrievedNotifications.data.notifications])
        }
        getNotifications();
    }, [notificationStatusToggled]);

      const removeModal = () => {
        setNotificationsModalToggle(false);
      };

      return (
        <div>
            <label for={`notifications-${userId}`} >
            {notificationReadStatus ? 
              <BellIcon className="h-6 w-6 text-white cursor-pointer" /> :
              <BellIcon className="h-6 w-6 text-yellow-400 cursor-pointer animate-bounce" />
            }
            
            </label>
            <button
                id={`notifications-${userId}`}
                style={{ display: "none" }}
                onClick={()=>{setNotificationsModalToggle(!notificationsModalToggle)}}
            />
            {notificationsModalToggle && (
            <NotificationsModal
              notifications={notifications}
              userId={userId}
              setNotificationStatusToggled = {setNotificationStatusToggled}
            />
          )}
          {notificationsModalToggle && (
            <div
              onClick={removeModal}
              className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
            ></div>
          )}
        </div>
      )
    }