import React, { useState, useRef } from "react";
import { storage } from "../firebase/firebase";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export const GroupPictureUpload = ({ setProfilePictureUrl }) => {
  const [uploadedFile, setUploadedFile] = useState({
    fileInputFile: null,
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [tokenAuth] = useState(localStorage.getItem("token"));

  const fileInputRef = useRef(null);
   const handleIconClick = () => {
     if (!uploading) {
       fileInputRef.current.click();
     }
   };

  const ACCEPTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/gif"];
  const STORAGE_KEY = `groupimages/`; 

    const uploadImage = async (file) => {
      setUploading(true);
      const storageRef = sRef(storage, STORAGE_KEY + file.name);
      try {
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
        setProfilePictureUrl(fileUrl);
        //  setImagePreviewUrl(fileUrl);
        alert("Image Uploaded!");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading image!");
      } finally {
        setUploading(false);
      }
    };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
      if (file && ACCEPTED_IMAGE_FORMATS.includes(file.type)) {
        setImagePreviewUrl(URL.createObjectURL(file)); 
        uploadImage(file); 
      } else {
        alert("Only accepts JPEG/PNG/GIF");
        // setUploadedFile({ fileInputFile: null });
      }
  };

  const handleUpload = async () => {
    console.log("Uploading image");
    if (!uploadedFile.fileInputFile) {
      alert("You need to upload a picture!");
      return;
    }

    const storageRef = sRef(storage, STORAGE_KEY + uploadedFile.fileInputFile.name);

    try {
      console.log("Starting upload");
      await uploadBytes(storageRef, uploadedFile.fileInputFile);
      console.log("Upload complete, getting download URL");
      const fileUrl = await getDownloadURL(storageRef);
      console.log("Image URL:", fileUrl); 
      setProfilePictureUrl(fileUrl)
      alert("Image Uploaded!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading image!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
        // onClick={(event) => {
        //   event.target.value = null;
        // }}
        disabled={uploading}
      />
      {!imagePreviewUrl && !uploading && (<ArrowUpTrayIcon
        className="h-10 w-10 cursor-pointer" 
        onClick={handleIconClick}
      /> )}
      {uploading && <p>Uploading...</p>}
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          className="h-32 w-32 object-cover"
        />
      )}
    </div>
  );
};
