import { BellIcon } from "@heroicons/react/20/solid";
import {NotificationsModal} from './NotificationsModal'
import axios from "axios";
import React, { useEffect, useState } from "react";

export function NotificationsButton({userId}) {
    const [notificationsModalToggle, setNotificationsModalToggle] = useState(false);
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const getNotifications = async () => {
            const retrievedNotifications = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/notifications/${userId}`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            setNotifications(retrievedNotifications.data.notifications)
        }
        getNotifications();
    }, []);

      const removeModal = () => {
        setNotificationsModalToggle(false);
      };

      return (
        <div>
        {console.log(notifications)}
            <label for={`notifications-${userId}`} >
            <BellIcon className="h-6 w-6 text-red-500 cursor-pointer" />
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