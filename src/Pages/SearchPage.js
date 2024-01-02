import React, { useEffect, useState } from "react";
import { CategoryDropDown } from "../Components/CategoryDropDown/CategoryDropDown";
import apiRequest from "../api";
import { UserProfileModal } from "../Components/SearchPage/UserProfileModal";
import { Outlet } from "react-router-dom";

export const SearchPage = ({ motion }) => {
  // const [user, setUser] = useState({ user: "", password: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");
  const [searchTermsList, setSearchTermsList] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [userProfileModalToggle, setUserProfileModalToggle] = useState(false);
  const [modalProfileId, setModalProfileId] = useState(null);

  const [userId, setUserId] = useState("");

  // Axios GET Placeholders
  const categoriesList = ["Instruments", "Genres", "Artists"];

  useEffect(() => {
    // console.log("getting current user");
    const getCurrentUser = async () => {
      let currentUserInfo = await apiRequest.get(`users/getCurrentUser`);
      setUserId(currentUserInfo.data.user.id);
    };
    getCurrentUser();

    // console.log("exit ");
  }, []);

  const handleChangeCategory = async (ev) => {
    if (ev.target.id !== "") {
      const response = await apiRequest.get(`${ev.target.id.toLowerCase()}`);
      const searchTerms = response.data.map((entry) => entry.name);
      setSearchTermsList(searchTerms);
    } else {
      setSearchTermsList([]);
    }
    setSelectedCategory(ev.target.id.toUpperCase());

    // console.log(`selected category state in Search Page: ${selectedCategory}`);
  };

  const handleChangeSearchTerm = (ev) => {
    setSelectedSearchTerm(ev.target.id);
    // console.log(
    //   `selected searchterm state in Search Page: ${selectedSearchTerm}`
    // );
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!selectedCategory || !selectedSearchTerm) {
      alert("Please select filter criteria");
    } else {
      const response = await apiRequest.get(
        `users/filteredusers/${selectedCategory.toLowerCase()}/${selectedSearchTerm}`,
      );
      setSearchedUsers(response.data.filteredUsers);
    }
  };

  const handleClick = () => {
    alert("insert modal code here");
  };

  const handleUserProfileModal = () => {
    //may need some code to pass in the user ID here
    setUserProfileModalToggle(!userProfileModalToggle);
  };

  const removeModal = () => {
    setUserProfileModalToggle(false);
  };

  const searchResults = searchedUsers
    ? searchedUsers.map((user) => {
        if (user.id === userId)
          // i need to pull from auth here
          return;
        else {
          return (
            <div
              className="flex flex-row h-[10em] p-[1em] bg-white text-black border-[1px] border-slate-200 rounded-md shadow-md overflow-hidden hover:cursor-pointer scale-100 transition-all active:scale-95 mb-[1em]"
              onClick={() => {
                setModalProfileId(user.id);
                handleUserProfileModal();
              }}
              id={`searchresult-${user.fullName}`}
            >
              <div className="flex flex-col justify-center pr-2">
                <div className="w-[6em] h-[6em] aspect-square items-center rounded-full overflow-hidden bg-white">
                  <img
                    src={user.profilePictureUrl}
                    className="object-cover h-full w-full"
                    alt="your next star player"
                  />
                </div>
              </div>

              <div className="flex flex-col pl-[1em] h-[100%] pt-[3%]">
                <p className="font-bold text-txtcolor-primary text-[1.5rem]">
                  {user.fullName}
                </p>
                <p className="text-slate-400 leading-0">
                  {user.instruments[0].userInstrument.instrumentExperience}{" "}
                  Years experience
                </p>
                <p className="font-semibold">{user.instruments[0].name}</p>
              </div>
            </div>
          );
        }
      })
    : null;

  return (
    <>
      <>
        <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[5em] px-[2em]">
        <Outlet />
        </div>
      </>
    </>
  );
};
