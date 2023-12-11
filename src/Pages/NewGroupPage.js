import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { GroupPictureUpload } from "./GroupPictureUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GroupVideoUpload } from "./GroupVideoUpload";

export const NewGroupPage = ({ motion }) => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [ensembleType, setEnsembleType] = useState("");
  const [bio, setBio] = useState("");
  const [isProfessional, setIsProfessional] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [videoUrls, setVideoUrls] = useState([])

  const handleBack = () => {
    navigate(`/groups`);
  };

  const addVideoUrl = (url) => {
    setVideoUrls(prevUrls => [...prevUrls, url]);
  }

  const handleSubmit = async () => {
      if (!groupName || !ensembleType || !bio || !profilePictureUrl) {
        alert("Please fill in all fields and upload a picture.");
        return;
      }

    try {
      console.log(profilePictureUrl)
      const response = await axios.post(`http://localhost:8080/groups/newgroup`, {
          groupName,
          isPublic: true, 
          ensembleType,
          careerStatus: isProfessional ? "Professional" : "Amateur",
          bio,
          profilePictureUrl, 
          videoClips: videoUrls
        }, {
          headers: {
            "Authorization": `${localStorage.getItem('token')}`
          }
      });

      // Handle success - navigate to a new page or show a success message
      console.log(response.data)
      navigate("/groups");
    } catch (error) {
      console.error("Error:", error);
      // Handle errors - show error message to user
    }
  };

  // Render group details
  return (
    <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
      <motion.div
        className="flex flex-col w-full lg:w-[30%] justify-start text-center"
        initial={{ x: "20", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0.1,
          type: "spring",
          mass: 0.4,
          damping: 8,
        }}
      >
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 my-2">NEW GROUP</h2>
          <div className="flex items-center justify-center w-full h-32 bg-gray-200 text-gray-500 rounded my-2">
            <GroupPictureUpload setProfilePictureUrl={setProfilePictureUrl} />
          </div>
          <input
            className="form-input mt-2 p-2 w-full border rounded"
            type="text"
            placeholder="NAME"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <textarea
            className="form-textarea mt-2 p-2 w-full border rounded"
            rows="1"
            placeholder="ENSEMBLE TYPE"
            value={ensembleType}
            onChange={(e) => setEnsembleType(e.target.value)}
          ></textarea>
          <textarea
            className="form-textarea mt-2 p-2 w-full border rounded"
            rows="3"
            placeholder="ABOUT THE GROUP"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col items-center mb-4">
          <h3 className="self-start text-lg font-semibold">Group Status</h3>
          <div className="rounded flex items-center justify-center">
            {/* Placeholder for session clip */}
            <button
              onClick={() => setIsProfessional(true)}
              className="bg-blue-400 text-white rounded px-4 py-2"
            >
              Professional
            </button>
            <button
              onClick={() => setIsProfessional(false)}
              className="bg-blue-400 text-white rounded px-4 py-2"
            >
              Amateur
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mb-4">
          <h3 className="text-lg font-semibold mt-4">Add Session Clips</h3>
          <div className="w-full h-24 bg-gray-200 rounded mt-2 flex items-center justify-center">
            {/* Placeholder for session clip */}
            <GroupVideoUpload setVideoUrls={addVideoUrl} />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            BACK
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white rounded px-4 py-2"
          >
            CREATE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
