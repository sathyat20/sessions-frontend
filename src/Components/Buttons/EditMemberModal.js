import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const EditMemberModal = ({ members, groupId, userId, removeModal, setEditedInfoToggle }) => {
    const [newMemberName, setNewMemberName] = useState("")
    const [searchedUsers, setSearchedUsers] = useState([])
    const [memberIds, setMemberIds] = useState(members.map((member)=>member.userId))
    const [adminIds, setAdminIds] = useState(members.map((member)=>{
        if (member.isAdmin) {
            return member.userId
        } else {
            return
        }
    }))

    useEffect(()=>{
        const getUsers = async () => {
            const users = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/byName/${newMemberName}`,
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          setSearchedUsers(users.data.users)
        }
        if (newMemberName) {
            getUsers();
        }
    },[newMemberName])

    const addUserToGroup = async (id, name, isAdmin) => {
        if (!(memberIds.includes(id))) {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/groups/addMember`,
                { groupId, userId: id, isAdmin },
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            setMemberIds((prevState)=>{
                const newState = prevState
                newState.push(id)
                return newState
            })
            alert(`Added ${name} as ${isAdmin ? 'Admin' : 'Member'}!`)
        } else {
            alert(`${name} is already a member!`)
        }
        setNewMemberName('');
        setEditedInfoToggle(true);
    }

    const removeUserFromGroup = async (id, name, isAdmin) => {
        if (!(memberIds.includes(id))) {
            alert(`${name} is not a member!`)
        } else if (adminIds.includes(id)) {
            alert(`Unable to remove admins`)
        } else {
            const response = window.confirm(`Are you sure you want to remove ${name} from your group?`)
            if(response) {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/groups/${groupId}/${id}`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
                setMemberIds((prevState) => {
                    const newState = prevState;
                    const removedMemberIndex = prevState.indexOf(id);
                    if (removedMemberIndex > -1) {
                        newState.splice(removedMemberIndex, 1);
                    }
                    return newState
                })
                setNewMemberName('')
                setEditedInfoToggle(true);
            }
        }
    }
    
    
    const searchedUserRows = searchedUsers.map((user)=>{
        return (
        <div
            className="flex flex-row p-[0.5em] bg-white text-black border-[1px] border-slate-300 rounded-md shadow-md overflow-hidden hover:cursor-pointer scale-100 transition-all active:scale-95 mb-[1em]"
            key={`addmemberresult-${user.id}`}
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
                {console.log(memberIds)}
                {memberIds.includes(user.id) ? 
                <button 
                className = 'bg-blue-800 text-white rounded-md my-[0.5em] px-[0.5em]'
                onClick = {()=>{removeUserFromGroup(user.id, user.fullName, false)}}
                >Remove Member
                </button>
                :
                <div className = 'flex flex-col'>
                <button 
                className = 'bg-blue-800 text-white rounded-md my-[0.5em] px-[0.5em]'
                onClick = {()=>{addUserToGroup(user.id, user.fullName, false)}}
                >Add Member
                </button>
                <button 
                className = 'bg-blue-800 text-white rounded-md my-[0.5em] px-[0.5em]'
                onClick = {()=>{addUserToGroup(user.id, user.fullName, true)}}
                >Add as Admin
                </button>
                </div> 
                }     
            </div>
        </div>
        )
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
          <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">EDIT MEMBERS</h1>
          <p className = 'font-bold'>Enter Username:</p>
          <input
            className='border border-slate-300'
            type="text"
            id="newMemberName"
            placeholder="Username"
            value={newMemberName}
                      onChange={(e) => { setNewMemberName(e.target.value); }}
                  />
                  {searchedUserRows}
          </div>
    </>
  );
};
