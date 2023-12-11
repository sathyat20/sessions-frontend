import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../App";

export const GroupsPage = ({ motion }) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [groups, setGroups] = useState([]);
  const { userId, userName } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    console.log("get token: ", TOKEN);
    setTokenAuth(TOKEN);

    const fetchGroups = async () => {
       if (!userId) {
         return;
       }
      try {
        const response = await axios.get(
          `http://localhost:8080/groups/${userId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        console.log(response.data)
        setGroups(response.data);
      } catch (err) {
        console.error("Error fetching groups", err);
      }
    };

    fetchGroups();

  }, []);

   const handleGroupClick = (group) => {
     navigate(`/group/${group.id}`, {state: {group}});
   };

   const handleCreateGroup = () => {
     navigate(`/newgroup`);
   };

  return (
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
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            <div className="h-1 w-50 bg-blue-500 mx-2"></div>
            <div className="h-1 w-50 bg-blue-500 mx-2"></div>
            {userName},
            <br />
            Welcome to your <br />
            GROUPS
            <div className="h-1 w-50 bg-blue-500 mx-2"></div>
            <div className="h-1 w-50 bg-blue-500 mx-2"></div>
          </h1>
        </header>

        <div className="w-full grid grid-cols-2 gap-0">
          {groups.map((group) => (
            <div
              key={group.id}
              className="group relative pb-[70%] bg-blue-400 bg-cover bg-center overflow-hidden shadow-md cursor-pointer transition duration-300 ease-in-out"
              onClick={() => handleGroupClick(group)}
              style={{
                backgroundImage: `url(${
                  group.profilePictureUrl ||
                  "https://cdn.pixabay.com/photo/2018/08/27/10/11/radio-cassette-3634616_1280.png"
                })`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25"></div>
              <div className="absolute bottom-0 w-full flex justify-center items-center bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                <h3 className="text-white text-lg font-bold text-center">
                  {group.groupName}
                </h3>
              </div>
            </div>
          ))}

          <div className="group relative pb-[70%] bg-blue-500 overflow-hidden shadow-md cursor-pointer transition duration-300 ease-in-out flex justify-center items-center">
            <div className="absolute inset-0 group-hover:bg-black group-hover:opacity-25 transition duration-300 ease-in-out"></div>
            <span
              onClick={handleCreateGroup}
              className="absolute flex bottom-0 justify-center items-center w-full text-white text-lg font-bold text-center"
            >
              Create new GROUP
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
