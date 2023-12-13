import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { EditGroupModal } from "../Components/GroupsPage/EditGroupModal";
import { VideoTile } from "../Components/VideoTile";
import axios from "axios";
import {EditMemberModal} from "../Components/Buttons/EditMemberModal"
import {EditMemberButton} from "../Components/Buttons/EditMemberButton"
import {LeaveGroupButton} from "../Components/Buttons/LeaveGroupButton"
import { GroupsPage } from "./GroupsPage";

export const GroupDetailPage = ({ motion }) => {
  const location = useLocation();
  const [group, setGroup] = useState(location?.state?.group ? location.state.group : null)
  const [userId, setUserId] = useState(null);
  const {groupId} = useParams()
  const [editMemberModalToggle, setEditMemberModalToggle] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedInfoToggle, setEditedInfoToggle] = useState(false)

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    const getGroupData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/groups/group/${groupId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setGroup(response.data)
    }
    const getCurrentUser = async () => {
      let currentUserInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/getCurrentUser`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setUserId(currentUserInfo.data.user.id);
    };

    if (!group || editedInfoToggle) {
      getGroupData();
      setEditedInfoToggle(false);
    }
    getCurrentUser();
  }, [editedInfoToggle])

  const removeEditMemberModal = () => {
    setEditMemberModalToggle(false);
  };

  // Render group details
  return (
    <div className="flex flex-col h-[100dvh] pb-[4em]">
      <div className="flex-grow overflow-y-auto">
      
        {console.log(editMemberModalToggle)}
        {group ? (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              {/* Header */}
              <button onClick={toggleEditModal} className="edit-button-styles">
                <PencilSquareIcon className="icon-styles" />
                Edit Group
              </button>
              <EditMemberButton 
      groupId={group.id}
      editMemberModalToggle={editMemberModalToggle}
      setEditMemberModalToggle={setEditMemberModalToggle}
      members={group.userGroups}
      userId = {userId}
      />
      <LeaveGroupButton userId = {userId} groupId = {group.id} />
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
                  <button className="text-blue-800 hover:text-blue-600 inline-block ml-2">
                    SEE ALL
                  </button>
                </div>
                <div className="flex overflow-x-auto space-x-4">
                  {group.videoClips &&
                    group.videoClips.map((clip, index) => (
                      <div
                        key={index}
                        className="flex-none "
                      >
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
                  <button className="text-blue-800 hover:text-blue-600 inline-block ml-2">
                    SEE ALL
                  </button>
                </div>
                <div className="flex flex-wrap">
                  {group.userGroups &&
                    group.userGroups.map((userGroup, index) => (
                      <div key={index} className="relative">
                        <img
                          src={
                            userGroup.user.profilePictureUrl || "default_image_path.jpg"
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

      {editMemberModalToggle && (
          <EditMemberModal
            members={group.userGroups}
            groupId ={group.id}
            userId={userId}
            removeModal = { removeEditMemberModal }
            setEditedInfoToggle = {setEditedInfoToggle}
          />
        )}
        {editMemberModalToggle && (
          <div
            onClick={removeEditMemberModal}
            className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
          ></div>
        )}
      {showEditModal && <EditGroupModal removeModal={toggleEditModal} />}
    </div>
  );
};

