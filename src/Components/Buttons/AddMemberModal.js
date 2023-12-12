import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const AddMemberModal = ({ members, groupId, userId, removeModal }) => {
    const [newMemberName, setNewMemberName] = useState("")
    const [searchedUsers, setSearchedUsers] = useState([])

    useEffect(()=>{
        const getUsers = async () => {
            const users = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/byName/${newMemberName}`,
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          setSearchedUsers(users.data.users)
        }
    },[newMemberName])

    const addUserToGroup = async (id, name, isAdmin) => {
        if (true) { // userId not in members - to edit later
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/groups/addMember`,
                { groupId, userId: id, isAdmin },
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            alert(`Added ${name} as ${isAdmin ? 'Admin' : 'Member'}!`)
        } else {
            alert(`${name} is already a member!`)
        }
    }
    
    const memberRows = searchedUsers.map((user)=>{
        <div
            className="flex flex-row p-[0.5em] bg-white text-black border-[1px] border-slate-300 rounded-md shadow-md overflow-hidden hover:cursor-pointer scale-100 transition-all active:scale-95 mb-[1em]"
            id={`addmemberresult-${user.id}`}
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
                <p className="font-bold text-[1.5rem]">
                    {user.fullName}
                </p>
                <div className = 'flex flex-row'>
                <button onClick = {()=>{addUserToGroup(user.id, user.name, false)}}>Add Member</button>
                <button onClick = {()=>{addUserToGroup(user.id, user.name, true)}}>Add as Admin</button>
                </div>           
            </div>
        </div>

    })

    return (
        <>
          <div className="overflow-y-auto absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[50%] lg:w-[40%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
          <div
            className="fixed top-[1em] right-[1em] hover:cursor-pointer"
            onClick={removeModal}
          >
            <XMarkIcon className="h-6 w-6 text-txtcolor-secondary" />
          </div>
          <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">ADD NEW MEMBER</h1>
          <p>Enter Username:</p>
          <input
            className='border border-slate-300'
            type="text"
            id="newMemberName"
            placeholder="newMemberName"
            value={newMemberName}
                      onChange={(e) => { setNewMemberName(e.target.value); }}
                  />
          </div>
    </>
  );
};
