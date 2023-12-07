import React, { useEffect, useState } from "react";
import axios from "axios";
import {VideoTile} from "../../VideoTile.js";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { storage } from "../../firebase/firebase.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

export function EditClips({ displayedUserId }) {
    const [clipsList, setClipsList] = useState([]);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
  
    useEffect(() => {
      const getClips = async () => {
        const clips = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/clips`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setClipsList(clips); // replace depending on what comes out of the console.log
      };
      getClips();
    }, [displayedUserId, isBeingEdited]);

    const addClip = async () => {

    }
  
    
    const displayedClips = clipsList.data?.map((clip) => {     
      return (
        <VideoTile videoId = {clip.id} videoUrl = {clip.hostUrl}/>
      );
    });
  
    
  
    return (
        <div>
            <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
                SESSION CLIPS
            </h1>
            <label for={`editButton-clips`}>
                {!isBeingEdited ? (
                    <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                ) : null}
            </label>
            <button
                onClick={() => setIsBeingEdited(true)}
                id={`editButton-clips`}
                style={{ display: "none" }}
            />
            <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em] flex flex-row justify-center">
                {displayedClips}
            </div>
            {isBeingEdited ? (
                <div>
                    <label for={`addArtist`}>
                        Add a Clip <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
                    </label>
                    <input
            type="file"
            id="profile-picture"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              addClip(e.target.files[0]);
              setIsBeingEdited(false)
            }}
          />
                </div>
            ) : null}

        </div>
    );
}
  