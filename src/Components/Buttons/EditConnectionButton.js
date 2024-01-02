import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/20/solid";
import apiRequest from "../../api";
import React, { useEffect, useState } from "react";

//this button should not display on user's own profile page
export function EditConnectionButton({requesterId, requestedId, requestedName}) {
    //const [connectedIds, setConnectedIds] = useState({});
    const [mode, setMode] = useState('');

    useEffect(() => {
        const getConnections = async () => {
            const connections = await apiRequest.get(`connections/${requesterId}`);
            const pulledIds = {};
            connections.data.forEach((connection) => {
                const usersConnection = connection.requesterRelation ? connection.requesterRelation : connection.requestedRelation
                pulledIds[usersConnection.id] = connection.status;
                })
            if (requestedId in pulledIds && pulledIds[requestedId] === 'confirmed') {
                setMode('delete');
            } else if (requestedId in pulledIds && pulledIds[requestedId] === 'pending') {
                setMode('pending');
            } else if (!(requestedId in pulledIds)) {
                setMode('add')
            } else {
                alert('error, please check')
            }
            //setConnectedIds(pulledIds);
        };
        getConnections();
      }, [requesterId]);

    const handleClick = async () => {
        if (mode === 'pending') {
            return;
        } else if (mode === 'add') {
            const backendResponse = await apiRequest.post(
                `connections/`,
                {requesterId, requestedId},
              );
            // setConnectedIds((prevState)=>{
            //     return {...prevState, [requestedId]:'pending'}
            // })
            setMode('pending')
            alert('Connection requested!') 
        } else if (mode === 'delete') {
            const response = window.confirm(`Are you sure you want to remove ${requestedName} from your connections?`)
                if (response) { 
                    const backendResponse = await apiRequest.delete(
                        `connections/${requesterId}/${requestedId}`,
                      );
                    // setConnectedIds((prevState)=>{
                    //     const {requestedId, ...others} = prevState;
                    //     return others
                    // })
                    setMode('add')
                    alert('Connection removed')
                }
        }
    }

        const buttonIcon = () => {
            if (mode === 'add') {
                return <UserPlusIcon className="h-6 w-6 text-white cursor-pointer" />
            } else if (mode === 'delete') {
                return <UserMinusIcon className="h-6 w-6 text-white cursor-pointer" />
            } else if (mode === 'pending') {
                return <UserPlusIcon className="h-6 w-6 text-slate-500" /> // grey this out later
            }
        } 
            
        

    return (
        <div>
            <label for={`editConnection-${requestedId}`} >
            {buttonIcon()}
            </label>
            <button
                id={`editConnection-${requestedId}`}
                style={{ display: "none" }}
                onClick={() => {
                    handleClick();
                }}
            />
        </div>
    )
}