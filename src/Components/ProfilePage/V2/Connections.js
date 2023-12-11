import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Connections({ displayedUserId }) {
    const [connectionsList, setConnectionsList] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const getConnections = async () => {
        const connections = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/connections/${displayedUserId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setConnectionsList(connections); // replace depending on what comes out of the console.log
      };
      getConnections();
    }, [displayedUserId]);
  
    
    const displayedConnections = connectionsList.data?.map((connection) => {     
        const usersConnection = connection.requesterRelation ? connection.requesterRelation : connection.requestedRelation
        return (
            <div className='flex flex-col w-[5em] justify-start'>
                <label for={`navigate-user-${usersConnection.id}`}>
                    <div className=" h-[5em] rounded-lg overflow-hidden cursor-pointer">
                        <img className= 'h-full w-full object-cover' src={usersConnection.profilePictureUrl} />
                    </div>
                </label>
                <p className="text-xs">{usersConnection.fullName}</p>
                <button
                    id={`navigate-user-${usersConnection.id}`}
                    style={{ display: "none" }}
                    onClick={() => navigate(`/userprofile/${usersConnection.id}`)}
                />
            </div>
        );
    });   
  
    return (
        <div>
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">CONNECTIONS</h1>
        <div className = 'flex flex-row overflow-x-scroll'>
            {displayedConnections}
        </div>
        </div>
    );
  }
  