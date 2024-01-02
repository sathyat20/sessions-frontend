import React, { useEffect, useState, useContext } from "react";
import apiRequest from "../../api";
import { VideoTile } from "../VideoTile.js";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { storage } from "../../firebase/firebase.js";
import {
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { UserContext } from "../../App.js";

export function EditGroupClips({ displayedGroupId, onEditSaved }) {
  const [clipsList, setClipsList] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newVideo, setNewVideo] = useState(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const getClips = async () => {
      const response = await apiRequest.get(`groups/${displayedGroupId}/clips`);
      setClipsList(response.data || []);
    };
    getClips();
  }, [displayedGroupId, isBeingEdited]);

  const writeData = async () => {
    const fileRef = sRef(
      storage,
      `group-videoclips/${displayedGroupId}/${Date.now()}`
    );
    uploadBytes(fileRef, newVideo.file)
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        return apiRequest.post(
          `groups/${displayedGroupId}/clips`,
          { hostUrl: url, groupId: displayedGroupId, userId }
        );
      })
      .then((addedClip) => {
        setClipsList((prevState) => [addedClip.data, ...prevState]);
        setNewVideo(null);
        onEditSaved()
      })
      .catch((error) => console.error("Error in adding new clip:", error));
  };

  const deleteClip = async (url, clipId, clipIndex) => {
    if (window.confirm(`Delete clip?`)) {
      const fileName = url.split("%2F")[2].split("?")[0];
      const fileRef = sRef(
        storage,
        `group-videoclips/${displayedGroupId}/${fileName}`
      );
      deleteObject(fileRef)
        .then(() => {
          return apiRequest.delete(`groups/clips/${clipId}`);
        })
        .then(() => {
          setClipsList((prevState) => {
            const updatedClips = [...prevState];
            updatedClips.splice(clipIndex, 1);
            return updatedClips;
          });
          onEditSaved()
        })
        .catch((err) => console.error("Error deleting clip:", err));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewVideo({
        file: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const displayedClips = clipsList.map((clip, index) => (
    <div className="relative m-2" key={clip.id}>
      <VideoTile videoId={clip.id} videoUrl={clip.hostUrl} />
      {isBeingEdited && (
        <div
          onClick={() => deleteClip(clip.hostUrl, clip.id, index)}
          className="absolute -top-[8%] -right-[8%] z-[30] bg-white rounded-[50%] w-[1em] h-[1em] border flex justify-center items-center"
        >
          <XCircleIcon className="h-8 w-8 text-gray-500" />
        </div>
      )}
    </div>
  ));

  return (
    <div className="my-4 p-2 border border-black">
      <section className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
          SESSION CLIPS
        </h1>
        <label htmlFor={`editButton-clips`}>
          <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
        </label>
        <button
          onClick={() => setIsBeingEdited(!isBeingEdited)}
          id={`editButton-clips`}
          style={{ display: "none" }}
        />
      </section>
      <section
        className={`text-[1.5rem] font-semibold leading-[1.2em] flex flex-row ${
          isBeingEdited ? "flex-wrap" : ""
        } justify-around overflow-x-scroll`}
      >
        {displayedClips}
      </section>
      {isBeingEdited && (
        <section className="flex flex-row justify-center">
          <div className="bg-yellow-300 rounded-lg">
            {newVideo ? (
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center p-[0.5em]">
                  <p className="font-bold">Preview</p>
                  <VideoTile videoId="new-video" videoUrl={newVideo.preview} />
                </div>
                <div className="flex flex-col p-[0.5em]">
                  <button
                    className="rounded-md bg-green-300 text-black font-semibold px-[0.5em] my-[0.5em] w-[9em] cursor-pointer border border-slate-500"
                    onClick={writeData}
                  >
                    Confirm Upload
                  </button>
                  <button
                    className="rounded-md bg-red-300 text-black font-semibold px-[0.5em] my-[0.5em] w-[9em] cursor-pointer border-[1px] border-slate-500"
                    onClick={() => setNewVideo(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="addClip"
                className="flex flex-row p-[0.5em] items-center"
              >
                <div className="flex flex-row px-[1em]">
                  <p className="pr-[0.25em] font-bold">Add Clip</p>
                  <PlusCircleIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                </div>
              </label>
            )}
          </div>
          <input
            type="file"
            id="addClip"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </section>
      )}
    </div>
  );
}
