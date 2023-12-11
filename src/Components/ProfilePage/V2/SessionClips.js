import React, { useEffect, useState } from "react";
import axios from "axios";
import {VideoTile} from "../../VideoTile.js";

export function SessionClips({ displayedUserId }) {
    const [clipsList, setClipsList] = useState([]);
  
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
    }, [displayedUserId]);
  
    
    const displayedClips = clipsList.data?.map((clip) => {     
      return (
        <div className = 'pr-[0.5em]'>
        <VideoTile videoId = {clip.id} videoUrl = {clip.hostUrl}/>
        </div>
      );
    });
  
    
  
    return (
        <div className = "w-full">
            <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left w-full">
                SESSION CLIPS
            </h1>
            
            <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em] flex flex-row justify-start w-full h-full overflow-scroll">
                {displayedClips}
            </div>
  
        </div>
    );
  }
  