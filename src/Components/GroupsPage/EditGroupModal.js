import React, { useEffect, useState } from "react";
import { EditGroupPic } from "./EditGroupPic"
import { EditGroup } from "./EditGroup";
import { EditGroupClips } from "./EditGroupClips";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

export const EditGroupModal = ({ groupId, removeModal, onEditSaved }) => {
  const location = useLocation();
  const [group, setGroup] = useState(location.state?.group || {});
  // const [groupInfo, setGroupInfo] = useState({
  //   groupName: null,
  //   profilePictureUrl: null,
  //   bio: null,
  //   members: [], 
  // });


  return (
    <>
      <div className="overflow-y-auto absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[50%] lg:w-[40%] h-[80%] bg-white rounded-md border py-[2em] shadow-sm z-[90] gap-[1em]">
        <div
          className="fixed top-[1em] right-[1em] hover:cursor-pointer"
          onClick={removeModal}
        >
          <XMarkIcon className="h-6 w-6 text-txtcolor-secondary" />
        </div>
        {console.log(group)}
        <div className="flex flex-row justify-center items-center h-[10%] gap-[0em] mb-[300px] lg:mb-[4em]">
          <div className="flex flex-col gap-[1em] h-[100%] lg:w-[90%] md:w-[90%] w-[90%] py-[1em] ">
            {group ? (
              <div>
                <EditGroupPic
                  groupId={group.id}
                  storedURL={group.profilePictureUrl}
                  onEditSaved={onEditSaved}
                />
                <EditGroup groupInfo={group} onEditSaved={onEditSaved} />
                {console.log(group.id)}
                <EditGroupClips
                  displayedGroupId={group.id}
                  onEditSaved={onEditSaved}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
