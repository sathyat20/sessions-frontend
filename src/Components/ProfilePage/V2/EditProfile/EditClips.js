import React, { useEffect, useState } from "react";
import axios from "axios";
import {VideoTile} from "../../../VideoTile.js";
import { PencilSquareIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { storage } from "../../../../firebase/firebase.js";
import { ref as sRef, uploadBytes, getDownloadURL, deleteObject, refFromURL } from "firebase/storage";

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
        setClipsList(clips.data); // replace depending on what comes out of the console.log
      };
      getClips();
    }, [displayedUserId, isBeingEdited]);

    const addClip = async (newClip) => {    
    const fileRef = sRef(storage, `videoclips/${displayedUserId}/${Date.now()}`);
    uploadBytes(fileRef, newClip)
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}`, { // need to update!
          profilePictureUrl: url,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
      });
      });
    }

    const deleteClip = async (url) => {
      // const response = window.confirm(`Delete clip?`)
      //   if (response) { 
      //     const fileRef = refFromURL(url);
      //     deleteObject(fileRef).then(()=>{
      //       axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}`, { // need to update!
      //         profilePictureUrl: url,
      //       },
      //       {
      //         headers: { Authorization: localStorage.getItem("token") },
      //     });
      //     })
      //   }

      //delete clip from firebase, then delete clip here

    }
    
    const displayedClips = clipsList.map((clip) => {     
      return (
        <div className = 'relative bg-green-300 m-2'>
          <VideoTile videoId={clip.id} videoUrl={clip.hostUrl} />
          {isBeingEdited ?
            <div
              onClick={() => deleteClip(clip.hostUrl)}
              className='absolute -top-[8%] -right-[8%] z-[30] bg-white rounded-[50%] w-[1em] h-[1em] border flex justify-center items-center'
            >
              <XCircleIcon className="h-8 w-8 text-gray-500" />
            </div> : null}
        </div>
      );
    });
  
    
  
    return (
        <div className = 'my-4 p-2 border border-black'>
        {console.log(clipsList)}
        <section className = 'flex flex-row'>
            <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
                SESSION CLIPS
            </h1>
            <label for={`editButton-clips`}>
                    <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
            </label>
            <button
                onClick={() => setIsBeingEdited(!isBeingEdited)}
                id={`editButton-clips`}
                style={{ display: "none" }}
            />
        </section>
        <section className={`text-[1.5rem] font-semibold leading-[1.2em] flex flex-row ${isBeingEdited ? 'flex-wrap' : ''} justify-around overflow-x-scroll`}>
          {displayedClips}
        </section>
        {isBeingEdited ? (
          <section className='flex flex-row justify-center'>
            <label for={`addClip`} className = 'flex flex-row p-[0.5em] bg-yellow-300 rounded-lg'>
              <p className = 'pr-[0.25em] font-bold'>Add Clip</p> 
              <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
            </label>
            <input
              type="file"
              id="addClip"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                addClip(e.target.files[0]);
              }}
            />
          </section>
            ) : null}

        </div>
    );
}
  