import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../../../firebase/firebase.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  XCircleIcon,
  PencilSquareIcon
} from "@heroicons/react/20/solid";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

export function EditPic({ displayedUserId, storedURL }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(storedURL ? storedURL : null);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const writeData = async () => {
    setIsBeingEdited(false);
    const fileRef = sRef(storage, `profilepics/${displayedUserId}`);
    uploadBytes(fileRef, profilePicture)
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}`, {
          profilePictureUrl: url,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
      });
      });
  };

  const revertData = () => {
    setIsBeingEdited(false);
    setProfilePictureURL(storedURL);
  };

  return (
      <div className="flex flex-col items-center pb-[2em] relative">
          {console.log(profilePictureURL)}
          <div className="w-[15em] h-[15em] rounded-[50%] overflow-hidden">
              <img
                  src={profilePictureURL}
                  alt="Profile photo"
                  className="h-full object-cover"
              />
          </div>
          <label htmlFor="profile-picture" className="cursor-pointer">
              {!isBeingEdited ? <div className='absolute top-0 right-[10%] z-[30] bg-white rounded-[50%] w-[4em] h-[4em] border border-blue-800 flex justify-center items-center'>
                  <PencilSquareIcon className="h-8 w-8 text-gray-500" />
              </div>
              :null}
          </label>
          <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                      setProfilePicture(e.target.files[0]);
                      setProfilePictureURL(URL.createObjectURL(e.target.files[0]));
                      setIsBeingEdited(true);
                  }}
              />
      
      {isBeingEdited ? (
        <div className="flex flex-row p-2">
          <p className="mx-2"> Confirm new profile picture? </p>
          <label for={`confirmButton-profilePic`}>
            <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
          </label>
          <button
            id={`confirmButton-profilePic`}
            style={{ display: "none" }}
            onClick={() => {
              writeData();
            }}
          />
          <label for={`rejectButton-profilePic`}>
            <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
          </label>
          <button
            id={`rejectButton-profilePic`}
            style={{ display: "none" }}
            onClick={() => {
              revertData();
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
