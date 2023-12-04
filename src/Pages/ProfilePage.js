import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfilePic } from "../Components/ProfilePage/ProfilePic";
import { InstrumentList } from "../Components/ProfilePage/V2/InstrumentList";
import { Bio } from "../Components/ProfilePage/Bio";
import { ArtistList } from "../Components/ProfilePage/ArtistList";
import { GenreList } from "../Components/ProfilePage/V2/GenreList";
import { SessionClips } from "../Components/ProfilePage/V2/SessionClips"
import { Qualifications } from "../Components/ProfilePage/V2/Qualifications"
import axios from "axios";

export const ProfilePage = ({ motion, pageOwnerUserId, loggedInUserId }) => {
  // these are being set upon entry
  const [tokenAuth, setTokenAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const [isOwnPage, setIsOwnPage] = useState(true); //this will later setup depending on whether username on page matches login user
  const [pageOwnerInfo, setPageOwnerInfo] = useState(null);

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
        setPageOwnerInfo(pageOwnerInfo.data.user);
      };
      getUserInfo();
    }
  }, [isAuthenticated]);

  // const numberOfSessions = "65";
  // const uniqueCollaborators = "30";

  return (
    <>
    {console.log(pageOwnerInfo)}
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto ">
          <div className="flex flex-col pt-[2em] mb-[-10em] gap-[1.5em] lg:gap-[3em] ">
            <div>
              {pageOwnerInfo && userId ? (
                <section>
                  <ProfilePic
                    isOwnPage={isOwnPage}
                    displayedUserId={userId}
                    storedURL={pageOwnerInfo.profilePictureUrl}
                  />
                  {pageOwnerInfo.fullName}
                </section>
              ) : null}
            </div>

            {userId && (
              <div>
              <InstrumentList
                displayedUserId={userId}
                token={tokenAuth}
              />
              <GenreList
                displayedUserId={userId}
                token={tokenAuth}
              />
              <SessionClips 
              displayedUserId = {userId}
              token={tokenAuth}
            />  
            </div>
            )}

            {pageOwnerInfo ? (
              <Bio
                isOwnPage={isOwnPage}
                displayedUserId={userId}
                storedBio={pageOwnerInfo.bio}
              />
            ) : null}

            
            {userId && (
              <ArtistList
                isOwnPage={isOwnPage}
                displayedUserId={userId}
                token={tokenAuth}
              />
            )}

            Placeholder for favourite songs

            {userId && (
              <Qualifications
                displayedUserId={userId}
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
      </div>
    </>
  );
};
