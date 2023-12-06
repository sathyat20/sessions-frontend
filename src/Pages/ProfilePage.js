import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InstrumentList } from "../Components/ProfilePage/V2/InstrumentList";
import { ArtistList } from "../Components/ProfilePage/V2/ArtistList";
import { GenreList } from "../Components/ProfilePage/V2/GenreList";
import { SessionClips } from "../Components/ProfilePage/V2/SessionClips"
import { Qualifications } from "../Components/ProfilePage/V2/Qualifications"
import { Connections } from "../Components/ProfilePage/V2/Connections"
import { EditProfileModal } from "../Components/ProfilePage/V2/EditProfileModal"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export const ProfilePage = ({ motion, loggedInUserId }) => {
  // these are being set upon entry
  const {pageOwnerUserId} = useParams()
  const [tokenAuth, setTokenAuth] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [editProfileModalToggle, setEditProfileModalToggle] = useState(false);
  const [pageOwnerInfo, setPageOwnerInfo] = useState(null);
  const navigate = useNavigate();
  

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
          `${process.env.REACT_APP_BACKEND_URL}/users/${pageOwnerUserId ? pageOwnerUserId : userId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setPageOwnerInfo({...pageOwnerInfo.data.user});
      };
      getUserInfo();
    }
  }, [isAuthenticated, pageOwnerUserId]);

  const handleEditProfileModal = () => {
    //may need some code to pass in the user ID here
    setEditProfileModalToggle(!editProfileModalToggle);
  };

  const removeModal = () => {
    setEditProfileModalToggle(false);
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto ">
          <div className="flex flex-col pt-[2em] mb-[-10em] gap-[1.5em] lg:gap-[3em] ">
            <div>
              {pageOwnerUserId ?
                <button onClick={() => navigate(-1)}>
                  <ArrowLeftIcon class="h-6 w-6 text-gray-500" />
                </button>
                : null}
                <button onClick={()=>{handleEditProfileModal()}}> editprofile </button>
            </div>
            <div>
              {pageOwnerInfo && userId ? (
                <section>
                  <div className="flex flex-col items-center pb-[2em]">
                    <div className="w-[15em] h-[15em] rounded-lg overflow-hidden">
                      <img
                        src={pageOwnerInfo.profilePictureUrl}
                        alt="Profile photo"
                        className="h-full object-cover"
                      />
                    </div>
                  </div>        
                  {pageOwnerInfo.fullName}
                </section>
              ) : null}
            </div>

            {pageOwnerInfo && (
              <div>
              <InstrumentList
                displayedUserId={pageOwnerInfo.id}
                token={tokenAuth}
              />
              <GenreList
                displayedUserId={pageOwnerInfo.id}
                token={tokenAuth}
              />
              <SessionClips 
              displayedUserId = {pageOwnerInfo.id}
              token={tokenAuth}
            />  
            </div>
            )}

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

            
            {pageOwnerInfo && (
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
            )}
            {pageOwnerInfo && (
              <Connections
                displayedUserId={pageOwnerInfo.id}
                token={tokenAuth}
              />
            )}


            {/* LOGOUT BUTTON */}
            <div className="pt-[1.5em]">
              <form>
                <input
                  type="button"
                  value="LOGOUT"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                    navigate("/");
                  }}
                  className="secondary-cta-btn w-[100%] lg:w-[100%]"
                />
              </form>
            </div>
          </div>
        </div>
        {/* MODALS GO HERE */}
        {editProfileModalToggle && (
            <EditProfileModal
              removeModal={removeModal}
            />
          )}
          {editProfileModalToggle && (
            <div
              onClick={removeModal}
              className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
            ></div>
          )}
      </div>
    </>
  );
};
