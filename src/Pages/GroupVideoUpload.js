import React, { useState } from "react";
import { storage } from "../firebase/firebase";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const GroupVideoUpload = ({ setVideoUrls }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const ACCEPTED_VIDEO_FORMATS = ["video/mp4", "video/webm", "video/ogg"];
  const STORAGE_KEY = `sample-videos/`;

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file && ACCEPTED_VIDEO_FORMATS.includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert("Only accepts MP4/WEBM/OGG video formats");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    console.log("Uploading video");
    if (!selectedFile) {
      alert("You need to upload a video!");
      return;
    }

    const storageRef = sRef(
      storage,
      STORAGE_KEY + selectedFile.name
    );

    try {
      console.log("Starting upload");
      await uploadBytes(storageRef, selectedFile);
      console.log("Upload complete, getting download URL");
      const fileUrl = await getDownloadURL(storageRef);
      console.log("Video URL:", fileUrl);
      setVideoUrls(fileUrl);
      alert("Video Uploaded!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading video!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
};
