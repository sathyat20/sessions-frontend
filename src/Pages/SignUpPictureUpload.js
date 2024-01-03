import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../api";

// Import Firebase Db and Methods
import { storage } from "../firebase/firebase.js"; // Reference to Firebase Storage Db
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Get Firebase Storage Methods

export const SignUpPictureUpload = ({ motion }) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [uploadedFile, setUploadFile] = useState({
    fileInputFile: null,
  });

  const navigate = useNavigate();

  const ACCEPTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/gif"];
  // const STORAGE_KEY = `userattachments/user${userId}/chatroom${chatroomId}/`; // This corresponds to the Firebase branch/document
  const STORAGE_KEY = `userprofilepictures/`; // This corresponds to the Firebase branch/document

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    console.log("get token: ", TOKEN);
    setTokenAuth(TOKEN);
  }, []);

  const handleUpload = async () => {
    if (!uploadedFile.fileInputFile) {
      alert("You need to upload a picture or skip!");
      return;
    }

    const storageRef = sRef(
      storage,
      STORAGE_KEY + uploadedFile.fileInputFile.name
    );

    try {
      await uploadBytes(storageRef, uploadedFile.fileInputFile);
      const fileUrl = await getDownloadURL(storageRef);
      console.log(fileUrl)
      await apiRequest.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/addProfilePicture`,
        { photoURL: fileUrl },
      );
      alert("Image Uploaded!");
      navigate("/additionaldetails");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading image!");
    }
    }

    const handleSkip = () => {
      navigate("/additionaldetails")
    }

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
        <motion.div
          className="flex flex-col w-full lg:w-[30%] justify-start text-center"
          initial={{ x: "20", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            mass: 0.4,
            damping: 8,
          }}
        >
          <div className="flex flex-col justify-center w-[100%] h-[60%] bg-slate-300 rounded-[3%] mb-[10%] overflow-hidden">
            {uploadedFile.fileInputFile !== null &&
            ACCEPTED_IMAGE_FORMATS.includes(uploadedFile.fileInputFile.type) ? (
              <img
                src={URL.createObjectURL(uploadedFile.fileInputFile)}
                alt={URL.createObjectURL(uploadedFile.fileInputFile).toString()}
                className="w-[100%] h-[100%] object-cover"
              />
            ) : null}
          </div>

          <div className="pb-[10%]">
            <form id="docpicker" className="text-center">
              <input
                id="fileinputform"
                type="file"
                name="fileUpload"
                value={
                  uploadedFile.fileInputValue != null
                    ? ""
                    : uploadedFile.fileInputvalue
                }
                onChange={(ev) => {
                  if (
                    ev.target.files[0] &&
                    ACCEPTED_IMAGE_FORMATS.includes(ev.target.files[0].type)
                  ) {
                    setUploadFile({
                      fileInputFile: ev.target.files[0],
                      fileInputValue: ev.target.fileUpload,
                    });
                  } else {
                    alert("Only accepts JPEG/PNG");
                    console.log(
                      "Actually no input validation here. But media input validation is implemented for chat."
                    );
                    setUploadFile({
                      fileInputFile: null,
                    });
                  }
                }}
                className="text-txtcolor-primary w-full max-w-xs"
              />
            </form>
          </div>
          <div className="flex justify-around">
            <button
              onClick={handleUpload}
              className="bg-fill-secondary px-[1em] py-[.2em] text-white font-semibold rounded-md active:outline-none scale-100 transition-all active:scale-95"
            >
              UPLOAD PROFILE PICTURE
            </button>
            <button
            onClick={handleSkip}
            className="bg-fill-secondary px-[1em] py-[.2em] text-white font-semibold rounded-md active:outline-none scale-100 transition-all active:scale-95"
            >
              SKIP AND CONTINUE
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
