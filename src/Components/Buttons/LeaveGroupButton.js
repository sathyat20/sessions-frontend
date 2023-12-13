import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export function LeaveGroupButton({userId, groupId}) {
    const navigate = useNavigate();
    const handleLeaveGroup = async() => {
        const response = window.confirm(`Are you sure you want to leave the group?`)
            if (response) {
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/groups/${groupId}/${userId}`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            navigate("/groups")
            }
    }
      return (
        <div>
            <label for={`leavegroup-${userId}-${groupId}`} >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-black cursor-pointer" /> :
            </label>
            <button
                id={`leavegroup-${userId}-${groupId}`}
                style={{ display: "none" }}
                onClick={()=>{handleLeaveGroup()}}
            />      
        </div>
      )
    }