import { UserPlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

//need to add in the code to prevent this from displaying on nonadmins' pages
export function AddMemberButton({groupId, addMemberModalToggle, setAddMemberModalToggle}) {
      return (
        <div>
            <label for={`addmember-${groupId}`} >
            <UserPlusIcon className="h-6 w-6 text-white cursor-pointer" />
            </label>
            <button
                id={`notifications-${userId}`}
                style={{ display: "none" }}
                onClick={()=>{setAddMemberModalToggle(!addMemberModalToggle)}}
            />      
        </div>
      )
    }