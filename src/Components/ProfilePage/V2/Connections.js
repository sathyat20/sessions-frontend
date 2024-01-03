import React, { useEffect, useState } from "react";
import apiRequest from "../../../api";
import { useNavigate } from "react-router-dom";

export function Connections({ displayedUserId }) {
  const [connectionsList, setConnectionsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getConnections = async () => {
      const connections = await apiRequest.get(`connections/${displayedUserId}`);
      setConnectionsList(connections); // replace depending on what comes out of the console.log
    };
    getConnections();
  }, [displayedUserId]);

  const displayedConnections = connectionsList.data?.map((connection) => {     
    const usersConnection = connection.requesterRelation ? connection.requesterRelation : connection.requestedRelation
    return (
        <div className='flex flex-col w-[5em] justify-start'>
            <label for={`navigate-user-${usersConnection.id}`}>
                <div className=" relative h-[5em] rounded-lg overflow-hidden cursor-pointer shadow-sm shadow-slate-500">
                    <img 
                    alt = {usersConnection.fullName} 
                    className= 'h-24 w-24 object-cover rounded-t rounded-b' 
                    src={usersConnection.profilePictureUrl}  
                    />
            <span className="absolute bottom-0 left-0 right-0 w-full text-center text-white bg-black bg-opacity-50 px-1 py-0.5 text-sm">
              {usersConnection.fullName}
            </span>
                </div>
            </label>
            <button
                id={`navigate-user-${usersConnection.id}`}
                style={{ display: "none" }}
                onClick={() => navigate(`/userprofile/${usersConnection.id}`)}
            />
        </div>
    );
});   

// const displayedConnections = connectionsList.data?.map((connection) => {     
//     const usersConnection = connection.requesterRelation ? connection.requesterRelation : connection.requestedRelation
//     return (
//         <div className='flex flex-col w-[5em] justify-start mx-1'>
//             <label for={`navigate-user-${usersConnection.id}`}>
//                 <div className=" h-[5em] rounded-lg overflow-hidden cursor-pointer shadow-sm shadow-slate-500">
//                     <img className= 'h-full w-full object-cover' src={usersConnection.profilePictureUrl} />
//                 </div>
//             </label>
//             <p className="text-xs">{usersConnection.fullName}</p>
//             <button
//                 id={`navigate-user-${usersConnection.id}`}
//                 style={{ display: "none" }}
//                 onClick={() => navigate(`/userprofile/${usersConnection.id}`)}
//             />
//         </div>
//     );
// });   

return (
  <div>
    <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">CONNECTIONS</h1>
    <div className='flex flex-row overflow-x-scroll'>
      {displayedConnections}
    </div>
  </div>
);
  }
