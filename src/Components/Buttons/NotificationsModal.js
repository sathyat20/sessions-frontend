import {ConnectionRequestNotification} from '../Notifications/ConnectionRequestNotification'
import { XMarkIcon } from "@heroicons/react/24/solid";

export const NotificationsModal = ({ notifications, userId, setNotificationStatusToggled, removeModal }) => {
    
    const notificationRows = notifications.map((notification) => {
        return (
        <div>
        <ConnectionRequestNotification userId = {userId} notification = {notification} setNotificationStatusToggled = {setNotificationStatusToggled} />
        </div>
        )
    })

    return (
        <>
          <div className="overflow-y-auto absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[50%] lg:w-[40%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
          <div
            className="fixed top-[1em] right-[1em] hover:cursor-pointer"
            onClick={removeModal}
          >
            <XMarkIcon className="h-6 w-6 text-txtcolor-secondary" />
          </div>
          <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">NOTIFICATIONS</h1>
          {notificationRows}
          </div>
    </>
  );
};
