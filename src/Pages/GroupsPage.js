import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GroupsPage = ({ motion }) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    console.log("get token: ", TOKEN);
    setTokenAuth(TOKEN);

    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/groups/4",
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`, 
            },
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">MY GROUPS</h2>
            <ul>
              {groups.map((group) => (
                <li key={group.id} onClick={() => handleGroupClick(group)}>
                  {group.groupName}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
};
