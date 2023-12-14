import { BellIcon } from "@heroicons/react/20/solid";

import React from "react";

export function NotificationsButton({userId, notificationReadStatus, notificationsModalToggle, setNotificationsModalToggle}) {
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
        </div>
      )
    }