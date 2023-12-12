import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {AddMemberModal} from "../Components/Buttons/AddMemberModal"

export const GroupDetailPage = ({ motion }) => {
  const location = useLocation();
  const [group, setGroup] = useState(location?.state?.group ? location.state.group : null)
  const [userId, setUserId] = useState(null);
  const {groupId} = useParams()
  const [addMemberModalToggle, setAddMemberModalToggle] = useState(false)

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

    if (!group) {
      getGroupData();
    }

    getCurrentUser();

  }, [])

  const removeAddMemberModal = () => {
    setAddMemberModalToggle(false);
  };

  // Render group details
  // Render group details
  return (
    <div className="flex flex-col h-[100dvh] pb-[4em]">
      <div className="flex-grow overflow-y-auto">
        {/* {console.log(location.state)} */}
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
                  <button className="text-blue-800 hover:text-blue-600 inline-block ml-2">
                    SEE ALL
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {group.videoClips &&
                    group.videoClips.map((clip, index) => (
                      <div key={index} className="w-full md:w-1/3 p-2">
                        <video
                          src={clip.hostUrl}
                          controls
                          className="w-full h-auto"
                        ></video>
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
                  {group.Users &&
                    group.Users.map((user, index) => (
                      <div key={index} className="relative">
                        <img
                          src={
                            user.profilePictureUrl || "default_image_path.jpg"
                          }
                          alt={user.fullName}
                          className="h-24 w-24 object-cover rounded-t rounded-b"
                        />
                        <span className="absolute bottom-0 left-0 right-0 w-full text-center text-white bg-black bg-opacity-50 px-1 py-0.5 text-sm">
                          {user.fullName}
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

      {addMemberModalToggle && (
          <AddMemberModal
            members='to edit later'
            userId={userId}
            removeModal = { removeAddMemberModal }
          />
        )}
        {addMemberModalToggle && (
          <div
            onClick={removeAddMemberModal}
            className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
          ></div>
        )}
    </div>
  );
};

