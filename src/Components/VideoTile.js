import React, { useEffect, useState } from "react";
import { VideoModal } from "./VideoModal/VideoModal";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

export function VideoTile({ videoId, videoUrl }) {
    const [videoModalToggle, setVideoModalToggle] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const togglePlayVideo = () => {
        setIsVideoPlaying(!isVideoPlaying);
        if (isVideoPlaying) {
          document.getElementById(`video-${videoId}`).play();
        } else {
          document.getElementById(`video-${videoId}`).pause();
        }
      };
      const handleVideoToggle = () => {
        setVideoModalToggle(!videoModalToggle);
      };
    
      const removeVideoModal = () => {
        setVideoModalToggle(false);
      };
  
  
    return (
        <>
            <div className="relative text-[1.5rem] font-semibold leading-[1.2em] flex flex-row justify-center h-[4em] w-32 rounded-md overflow-hidden shadow-sm shadow-slate-500">
                <video
                    id={`video-${videoId}`}
                    onClick={togglePlayVideo}
                    loop
                    className="h-full w-full object-cover border"
                >
                    <source
                        src={videoUrl}
                        type="video/mp4"
                    />
                </video>
                <button
                    className="absolute bottom-0 right-[0%] z-[30] scale-100 transition-all w-[1.25em] h-[1.25em] lg:w-[2em] lg:h-[2em] rounded-[50%] border bg-slate-300 hover:scale-110 hover:cursor-pointer active:scale-95 focus:outline-none shadow-md shadow-black"
                    //className = "absolute bottom-0 right-[10%] z-[30] scale-100 transition-all"
                    onClick={handleVideoToggle}
                >
                    <ArrowsPointingOutIcon className="text-slate-600 scale-75" />
                </button>
            </div>
            {videoModalToggle && (
                <VideoModal videourl={videoUrl} /> // replace this later
            )}

            {videoModalToggle && (
                <div
                    onClick={removeVideoModal}
                    className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
                ></div>
            )}
        </>
    );
}
