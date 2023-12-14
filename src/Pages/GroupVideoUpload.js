import React, { useState, useRef } from "react";
import { storage } from "../firebase/firebase";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { VideoCameraIcon } from "@heroicons/react/24/solid";

export const GroupVideoUpload = ({ setVideoUrls }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);


  const ACCEPTED_VIDEO_FORMATS = ["video/mp4", "video/webm", "video/ogg"];
  const STORAGE_KEY = `sample-videos/`;

  const handleVideoChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) =>
      ACCEPTED_VIDEO_FORMATS.includes(file.type)
    );

    if (validFiles.length !== files.length) {
      alert("Only accepts MP4/WEBM/OGG video formats");
    }

    setSelectedFiles(validFiles);
    await uploadVideos(validFiles);
  };

    const uploadVideos = async (files) => {
      setUploading(true);
      try {
        const uploadPromises = files.map((file) => uploadVideo(file));
        const fileUrls = await Promise.all(uploadPromises);
        setVideoUrls(fileUrls);
        alert("Videos Uploaded!");
      } catch (error) {
        alert("Error uploading videos!");
      } finally {
        setUploading(false);
      }
    };

  // const uploadVideo = async (file) => {
  //   const storageRef = sRef(storage, STORAGE_KEY + file.name);

  //   try {
  //     await uploadBytes(storageRef, file);
  //     return await getDownloadURL(storageRef);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     throw error;
  //   }
  // };
  // const handleUpload = async () => {
  //   if (selectedFiles.length === 0) {
  //     alert("You need to select at least one video!");
  //     return;
  //   }

  //   setUploading(true);
  //   try {
  //     const uploadPromises = selectedFiles.map((file) => uploadVideo(file));
  //     const fileUrls = await Promise.all(uploadPromises);
  //     setVideoUrls(fileUrls); // Pass all video URLs at once
  //     alert("Videos Uploaded!");
  //   } catch (error) {
  //     alert("Error uploading videos!");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

    const uploadVideo = async (file) => {
      const storageRef = sRef(storage, STORAGE_KEY + file.name);
      try {
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    };

      const handleIconClick = () => {
        if (!uploading) {
          fileInputRef.current.click();
        }
      };


  return (
    <div className="flex flex-col items-center w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        multiple
        onChange={handleVideoChange}
        style={{ display: "none" }}
      />
      {!uploading && (
        <VideoCameraIcon
          className="h-10 w-10 cursor-pointer"
          onClick={handleIconClick}
        />
      )}
      {uploading && <p>Uploading...</p>}
      <div className="space-y-2">
        {selectedFiles.map((file, index) => (
          <div key={index} className="text-sm">
            {file.name}
          </div> // Display file names as preview
        ))}
      </div>
    </div>
  );
};
