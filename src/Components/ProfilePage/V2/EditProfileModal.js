import React, { useEffect, useState } from "react";
import { EditInstruments } from "./EditProfile/EditInstruments";
import { EditArtists } from "./EditProfile/EditArtists";
import { EditGenres } from "./EditProfile/EditGenres";
// import { SessionClips } from "../Components/ProfilePage/V2/SessionClips"
// import { Qualifications } from "../Components/ProfilePage/V2/Qualifications"
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const EditProfileModal = ({ removeModal }) => {
  // these are being set upon entry
  const [tokenAuth, setTokenAuth] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [pageOwnerInfo, setPageOwnerInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
        fullName:null,
        password:null,
        profilePictureUrl: null,
        bio:null,
        careerStatus:null,
        experience:null,
        email:null
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      let currentUserInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/getCurrentUser`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setIsAuthenticated(true);
      setUserId(currentUserInfo.data.user.id);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const getUserInfo = async () => {
        const pageOwnerInfo = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        ); // this should be pageOwnerUserId
        setPageOwnerInfo({...pageOwnerInfo.data.user});
      };
      getUserInfo();
    }
  }, [isAuthenticated]);


    return (
        <>
        {console.log(pageOwnerInfo)}
            <div className="overflow-y-auto absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[50%] lg:w-[40%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
                <div className="flex flex-row w-full h-[30%] justify-center">
                    <div className="aspect-square mr-[1em] rounded-[50%] overflow-hidden ">
                        {/* <div>
                            {pageOwnerInfo && userId ? (
                <section>
                  <div className="flex flex-col items-center pb-[2em]">
                    <div className="w-[15em] h-[15em] rounded-lg overflow-hidden"> */}
                      <img
                        src={pageOwnerInfo ? pageOwnerInfo.profilePictureUrl : null}
                        alt="Profile photo"
                        className="h-full object-cover"
                      />
                    </div>
                  </div>        
                  <div className="flex flex-row justify-center items-center h-[100%] gap-[0em] mb-[300px] lg:mb-[4em]">
          <div className="flex flex-col gap-[1em] h-[100%] lg:w-[60%] md:w-[70%] w-[80%] py-[1em] ">
          {pageOwnerInfo? pageOwnerInfo.fullName:null}
            {pageOwnerInfo ? (
              <div className="font-bold text-slate-800 text-sm flex flex-col  ">
                <div className="flex flex-row">
                  <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
                    BIO
                  </h1>
                </div>
                {pageOwnerInfo.bio}
              </div>
              
            ) : null}
            {pageOwnerInfo ?          
            <EditInstruments displayedUserId={userId}/>
            : null}
            {pageOwnerInfo ? 
            <div>
            <EditGenres displayedUserId={userId}/>
            <br/>
            <EditArtists displayedUserId={userId}/>
            </div>
            : null}

            
            {/* {pageOwnerInfo && (
              <ArtistList
                displayedUserId={pageOwnerInfo.id}
                token={tokenAuth}
              />
            )}

            Placeholder for favourite songs

            {pageOwnerInfo && (
              <Qualifications
                displayedUserId={pageOwnerInfo.id}
                token={tokenAuth}
              />
            )}           */}
            </div>
        </div>
        <div
          className="fixed top-[1em] right-[1em] hover:cursor-pointer"
          onClick={removeModal}
        >
          <XMarkIcon className="h-6 w-6 text-txtcolor-secondary" />
        </div>
      </div>
    </>
  );
};
