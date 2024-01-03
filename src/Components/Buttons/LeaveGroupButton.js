import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import apiRequest from "../../api";
import React from "react";
import { useNavigate } from "react-router-dom";

export function LeaveGroupButton({userId, groupId}) {
    const navigate = useNavigate();
    const handleLeaveGroup = async() => {
        const response = window.confirm(`Are you sure you want to leave the group?`)
            if (response) {
                await apiRequest.delete(`groups/${groupId}/${userId}`)
            navigate("/groups")
            }
    }
      return (
        <div>
            <label for={`leavegroup-${userId}-${groupId}`} >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-white cursor-pointer" /> 
            </label>
            <button
                id={`leavegroup-${userId}-${groupId}`}
                style={{ display: "none" }}
                onClick={()=>{handleLeaveGroup()}}
            />      
        </div>
      )
    }