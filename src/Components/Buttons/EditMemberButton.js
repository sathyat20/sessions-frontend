import { UserGroupIcon } from "@heroicons/react/20/solid";
import React from "react";

export function EditMemberButton({groupId, editMemberModalToggle, setEditMemberModalToggle, members, userId}) {

    const adminIds = members?.map((member)=>{
        if (member.isAdmin) {
            return member.userId
        } else {
            return
        }
    })
    
    if (adminIds.includes(userId)) {
        return (
            <div>
                <label for={`editmember-${groupId}`} >
                    <UserGroupIcon className="h-6 w-6 text-white cursor-pointer" />
                </label>
                <button
                    id={`editmember-${groupId}`}
                    style={{ display: "none" }}
                    onClick={() => { setEditMemberModalToggle(!editMemberModalToggle) }}
                />
            </div>
        )
    } else {
        return
    }
}