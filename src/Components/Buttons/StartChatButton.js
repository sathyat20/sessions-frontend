import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Sockets
import { io } from "socket.io-client"; 
const socket = io(process.env.REACT_APP_BACKEND_URL);

export function StartChatButton({requestedId, requesterName, requestedName}) {
    const navigate = useNavigate();

    const handleCreateRoomForTwo = async () => {
          const createdRoom = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/createNewChatroomForTwo`,
            {
              secondUserId: requestedId,
              name: `${requesterName} and ${requestedName}`,
              genresPlayed: "",
              instrumentsWanted: "",
            },
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          const chatRoomId = createdRoom.data.data[0][0].chatroomId;
          alert("Room Created!");
          socket.emit("create-room-for-two", requestedId);
          navigate(`/${chatRoomId}/jamroom`)
      };

      return (
        <div>
            <label for={`startChat-${requestedId}`} >
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-red-500 cursor-pointer" />
            </label>
            <button
                id={`startChat-${requestedId}`}
                style={{ display: "none" }}
                onClick={handleCreateRoomForTwo}
            />
        </div>
      )
    }