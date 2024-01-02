import React, { useEffect, useState } from "react";
import apiRequest from "../../../../api";
import {VideoTile} from "../../../VideoTile.js";
import { PencilSquareIcon, PlusCircleIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { storage } from "../../../../firebase/firebase.js";
import { ref as sRef, uploadBytes, getDownloadURL, deleteObject, refFromURL } from "firebase/storage";

export function EditClips({ displayedUserId }) {
    const [clipsList, setClipsList] = useState([]);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [newVideo, setNewVideo] = useState(null);
  
    useEffect(() => {
      const getClips = async () => {
        const clips = await apiRequest.get(`users/${displayedUserId}/clips`);
        setClipsList(clips.data); 
      };
      getClips();
    }, [displayedUserId, isBeingEdited]);

  const writeData = async (newClip) => {
    const fileRef = sRef(storage, `videoclips/${displayedUserId}/${Date.now()}`);
    uploadBytes(fileRef, newClip)
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        const addedClip = apiRequest.post(`users/clips`, {
          hostUrl: url,
        })
        return addedClip;
      })
      .then((addedClip) => {
        console.log(addedClip)
        setClipsList((prevState) => {
          let newState = [...prevState];
          newState.unshift(addedClip.data.newClip);
          return newState 
        })
        setNewVideo(null);
      })
    }

    const deleteClip = async (url, clipId, clipIndex) => {
      const response = window.confirm(`Delete clip?`)
        if (response) { 
          const fileName = url.split('%2F')[2].split('?')[0]
          const fileRef = sRef(storage, `videoclips/${displayedUserId}/${fileName}`);
          deleteObject(fileRef);
            apiRequest.delete(`users/clips/${clipId}`);
          setClipsList((prevState)=>{
            prevState.splice(clipIndex, 1);
            return [...prevState]
          })
        }
    }
    
    const displayedClips = clipsList.map((clip, index) => {     
      return (
        <div className = 'relative m-2' key={clip.id}>
          <VideoTile videoId={clip.id} videoUrl={clip.hostUrl} />
          {isBeingEdited ?
            <div
              onClick={() => deleteClip(clip.hostUrl, clip.id, index)}
              className='absolute -top-[8%] -right-[8%] z-[30] bg-white rounded-[50%] w-[1em] h-[1em] border flex justify-center items-center'
            >
              <XCircleIcon className="h-8 w-8 text-gray-500" />
            </div> : null}
        </div>
      );
    });
  
    return (
        <div className = 'my-4 p-2 border border-black'>
        <section className = 'flex flex-row'>
            <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
                SESSION CLIPS
            </h1>
            {!isBeingEdited ? 
            <div>
            <label for={`editButton-clips`}>
                    <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
            </label>
            <button
                onClick={() => setIsBeingEdited(!isBeingEdited)}
                id={`editButton-clips`}
                style={{ display: "none" }}
            />
            </div> 
            : null}
        </section>
        <section className={`text-[1.5rem] font-semibold leading-[1.2em] flex flex-row ${isBeingEdited ? 'flex-wrap' : ''} justify-around overflow-x-scroll`}>
          {displayedClips}
        </section>
        {isBeingEdited ? (
          <section className='flex flex-row justify-center'>
            <div className='bg-yellow-300 rounded-lg '>
              {newVideo ?
                <div className='flex flex-row items-center'>

                  <div className='flex flex-col items-center p-[0.5em]'>
                    <p className='font-bold'>Preview</p>
                    <VideoTile videoId='new-video' videoUrl={URL.createObjectURL(newVideo)} />
                  </div>


                  <div className='flex flex-col p-[0.5em]'>
                    <button
                      className='rounded-md bg-green-300 text-black font-semibold px-[0.5em] my-[0.5em] w-[9em] cursor-pointer border border-slate-500'
                      onClick={() => { writeData(newVideo) }}>
                      Confirm Upload
                    </button>
                    <button
                      className='rounded-md bg-red-300 text-black font-semibold px-[0.5em] my-[0.5em] w-[9em] cursor-pointer border-[1px] border-slate-500'
                      onClick={() => { setNewVideo(null) }}>
                      Cancel
                    </button>
                  </div>

                </div>
                :
                <label for={`addClip`} className='flex flex-row p-[0.5em]  items-center'>
                  <div className='flex flex-row px-[1em]'>
                    <p className='pr-[0.25em] font-bold'>Add Clip</p>
                    <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
                  </div>
                </label>}
            </div>
            
            <input
              type="file"
              id="addClip"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => {
                setNewVideo(e.target.files[0]);
              }}
            />
          </section>
            ) : null}
            
            {isBeingEdited ? 
            <div className = 'flex flex-row justify-center w-full'>
            <label for={`confirmButton-user`}>
            <div className = "flex flex-row bg-green-200 rounded-lg p-0.5 border border-black m-2 font-bold">
            Done
              <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
              </div>
            </label>
            <button
              id={`confirmButton-user`}
              style={{ display: "none" }}
              onClick={() => setIsBeingEdited(!isBeingEdited)}
            />
            </div>
          :null}
        </div>
    );
}
  