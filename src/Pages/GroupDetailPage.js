import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/20/solid";
// import { StartChatButton } from "../Components/Buttons/StartChatButton";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/20/solid";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import { EditGroupModal } from "../Components/GroupsPage/EditGroupModal";
import { VideoTile } from "../Components/VideoTile";

import { GroupChatCreationModal } from "../Components/GroupsPage/GroupChatCreationModal";

import apiRequest from "../api";
import { EditMemberModal } from "../Components/Buttons/EditMemberModal";
import { EditMemberButton } from "../Components/Buttons/EditMemberButton";
import { LeaveGroupButton } from "../Components/Buttons/LeaveGroupButton";
import { GroupsPage } from "./GroupsPage";

export const GroupDetailPage = ({ motion }) => {
  const location = useLocation();
  const [group, setGroup] = useState(
    location?.state?.group ? location.state.group : null
  );
  const [userId, setUserId] = useState(null);
  const { groupId } = useParams();
  const [editMemberModalToggle, setEditMemberModalToggle] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [editedInfoToggle, setEditedInfoToggle] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const openChatModal = () => {
    setShowChatModal(true);
  };

  const closeChatModal = () => {
    setShowChatModal(false);
  };

  const handleCreateChat = () => {
    openChatModal();
  };

  const checkIfAdmin = (userGroups, userId) => {
    console.log("CHecking", userId);
    console.log(userGroups);
    return userGroups.some(
      (userGroup) => userGroup.user.id === userId && userGroup.isAdmin
    );
  };


  const onEditSaved = async () => {
    // fetch updated group data
    const response = await apiRequest.get(
      `${process.env.REACT_APP_BACKEND_URL}/groups/group/${groupId}`
    );
    setGroup(response.data);
  };

  useEffect(
    () => {
      const getGroupData = async () => {
        const response = await apiRequest.get(
          `${process.env.REACT_APP_BACKEND_URL}/groups/group/${groupId}`
        );
        console.log(response.data);
        setGroup(response.data);
        setEditedInfoToggle(false);
      };

      const getCurrentUser = async () => {
        let currentUserInfo = await apiRequest.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/getCurrentUser`
        );
        setUserId(currentUserInfo.data.user.id);
        console.log("userId is", userId);
      };

      if (!group || editedInfoToggle) {
        getGroupData();
        setEditedInfoToggle(false);
      }
      getCurrentUser();
    },
    groupId,
    [editedInfoToggle]
  );

  useEffect(() => {
    if (group && userId) {
      const adminStatus = checkIfAdmin(group.userGroups, userId);
      setIsAdmin(adminStatus);
    }
  }, [group, userId]);

  const removeEditMemberModal = () => {
    setEditMemberModalToggle(false);
  };

  // Render group details
  return (
    <div className="flex flex-row h-[100dvh]">
      <div className="flex-grow overflow-y-auto">
        {/* {console.log(editMemberModalToggle)} */}
        {group ? (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              {/* Header */}

              <div className="mb-8">
                {group.profilePictureUrl && (
                  <img
                    src={group.profilePictureUrl}
                    alt={`${group.groupName} Profile`}
                    className="mx-auto h-48 w-full object-cover rounded"
                  />
                )}

                <div className="h-1 w-50 bg-yellow-500 mx-2 mt-2"></div>
                <div className="h-1 w-50 bg-yellow-500 mx-2"></div>
                <h1 className="text-4xl font-bold">{group.groupName}</h1>
                <p className="text-xl text-blue-800">{group.ensembleType}</p>
                <p className="text-md text-gray-600">{group.careerStatus}</p>
                <div className="h-1 w-50 bg-blue-500 mx-2"></div>
                <div className="h-1 w-50 bg-blue-500 mx-2"></div>
              </div>

              {/* Session Clips */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <h2 className="text-3xl text-yellow-400 font-bold inline-block">
                    SESSION CLIPS
                  </h2>
                </div>
                <div className="flex overflow-x-auto space-x-4">
                  {group.videoClips &&
                    group.videoClips.map((clip, index) => (
                      <div key={index} className="flex-none ">
                        {/* <video
                          src={clip.hostUrl}
                          controls
                          className="w-full h-auto"
                        ></video> */}
                        <VideoTile videoId={index} videoUrl={clip.hostUrl} />
                      </div>
                    ))}
                </div>
              </div>

              {/* About Us */}
              <div className="mb-8">
                <h2 className="text-3xl text-yellow-400 font-bold mb-4">
                  ABOUT US
                </h2>
                <p>{group.bio}</p>
              </div>

              {/* Members */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <h2 className="text-3xl text-yellow-400 font-bold inline-block">
                    MEMBERS
                  </h2>
                </div>
                <div className="flex overflow-x-auto pb-6">
                  {group.userGroups &&
                    group.userGroups.map((userGroup, index) => (
                      <div key={index} className="relative">
                        <img
                          src={
                            userGroup.user.profilePictureUrl ||
                            "default_image_path.jpg"
                          }
                          alt={userGroup.user.fullName}
                          className="h-24 w-24 object-cover rounded-t rounded-b"
                        />
                        <span className="absolute bottom-0 left-0 right-0 w-full text-center text-white bg-black bg-opacity-50 px-1 py-0.5 text-sm">
                          {userGroup.user.fullName}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading group details...</p>
        )}
      </div>

      <div className="h-[10em] w-[2em] absolute top-10 right-0 bg-blue-900 rounded-tl-md rounded-bl-md flex flex-col justify-between items-center py-4">
        {/* Add your buttons and elements here */}
        {/* Example button */}
        <button className="edit-button-styles">
          {group ? (
            <EditMemberButton
              groupId={group.id}
              editMemberModalToggle={editMemberModalToggle}
              setEditMemberModalToggle={setEditMemberModalToggle}
              members={group.userGroups}
              userId={userId}
            />
          ) : null}
        </button>

        {isAdmin && (
          <button onClick={toggleEditModal} className="edit-button-styles">
            <PencilSquareIcon className="h-6 w-6 text-white" />
          </button>
        )}

        <button onClick={handleCreateChat} className="edit-button-styles">
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white cursor-pointer" />
        </button>
        {group ? <LeaveGroupButton userId={userId} groupId={group.id} /> : null}
      </div>

      {editMemberModalToggle && (
        <EditMemberModal
          members={group.userGroups}
          groupId={group.id}
          userId={userId}
          removeModal={removeEditMemberModal}
          setEditedInfoToggle={setEditedInfoToggle}
        />
      )}
      {editMemberModalToggle && (
        <div
          onClick={removeEditMemberModal}
          className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
        ></div>
      )}
      {showEditModal && (
        <EditGroupModal
          removeModal={toggleEditModal}
          onEditSaved={onEditSaved}
        />
      )}
      {showChatModal && (
        <GroupChatCreationModal
          groupId={group.id}
          groupName={group.groupName}
          onClose={closeChatModal}
        />
      )}
    </div>
  );
};
