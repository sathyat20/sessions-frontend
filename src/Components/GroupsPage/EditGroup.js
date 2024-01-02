import React, { useState, useEffect } from "react";
import apiRequest from "../../api";
import Select from "react-select";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

export function EditGroup({ groupInfo, onEditSaved }) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [groupDetails, setGroupDetails] = useState({
    groupName: groupInfo?.groupName,
    ensembleType: groupInfo?.ensembleType,
    careerStatus: groupInfo?.careerStatus,
    bio: groupInfo?.bio,
  });

  useEffect(() => {
    setGroupDetails({
      groupName: groupInfo?.groupName,
      ensembleType: groupInfo?.ensembleType,
      careerStatus: groupInfo?.careerStatus,
      bio: groupInfo?.bio,
    });
  }, [groupInfo]);


  const careerStatusOptions = [
    { value: "Amateur", label: "Amateur" },
    { value: "Professional", label: "Professional" },
  ];

  const handleSelectChange = (e) => {
    setGroupDetails((prevState) => {
      return { ...prevState, careerStatus: e.label };
    });
  };

  //  const userInfoChange = (e) => {
  //    const name = e.target.id;
  //    const value = e.target.value;
  //    setUserInfo((prevState) => {
  //      return { ...prevState, [name]: value };
  //    });
  //  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const writeData = async () => {
    const response = await apiRequest.put(
      `groups/edit/${groupInfo.id}`, // to edit later
      groupDetails
    );
    console.log("EditedGroup", response.data.editedGroup)
    setGroupDetails(response.data.editedGroup);
    setIsBeingEdited(false);
    onEditSaved()
  };

  const revertData = () => {
    setGroupDetails({
      groupName: groupInfo?.groupName,
      ensembleType: groupInfo?.ensembleType,
      careerStatus: groupInfo?.careerStatus,
      bio: groupInfo?.bio,
    });
    setIsBeingEdited(false);
  };

  return (
    <div className="py-[1em]">
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
          USER PROFILE
        </h1>
        <label for={`editButton-user`}>
          {!isBeingEdited ? (
            <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          ) : null}
        </label>
        <button
          onClick={() => setIsBeingEdited(true)}
          id={`editButton-user`}
          style={{ display: "none" }}
        />
        {isBeingEdited ? (
          <div className="flex flex-row">
            <label for={`confirmButton-user`}>
              <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
            </label>
            <button
              id={`confirmButton-user`}
              style={{ display: "none" }}
              onClick={() => {
                writeData();
              }}
            />
            <label for={`rejectButton-user`}>
              <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
            </label>
            <button
              id={`rejectButton-user`}
              style={{ display: "none" }}
              onClick={() => {
                revertData();
              }}
            />
          </div>
        ) : null}
      </div>
      <section id="Group Name">
        <p className="font-bold text-slate-800 text-sm">Group Name: &nbsp;</p>
        {isBeingEdited ? (
          <input
            className="border border-slate-300"
            type="text"
            name="groupName"
            placeholder="Group Name"
            value={groupDetails.groupName}
            onChange={handleInputChange}
          />
        ) : (
          groupDetails.groupName
        )}
        <br />
      </section>
      <br />
      <section id="Ensemble Type">
        <p className="font-bold text-slate-800 text-sm">
          Ensemble Type: &nbsp;
        </p>
        {isBeingEdited ? (
          <input
            className="border border-slate-300"
            type="text"
            name="ensembleType"
            placeholder="Ensemble Type"
            value={groupDetails.ensembleType}
            onChange={handleInputChange}
          />
        ) : (
          groupDetails.ensembleType
        )}
        <br />
      </section>
      <br />
      <section id="Group Status">
        <p className="font-bold text-slate-800 text-sm">Group Status:</p>
        {isBeingEdited ? (
          <Select
            size="10"
            options={careerStatusOptions}
            value={{
              value: groupDetails.careerStatus,
              label: groupDetails.careerStatus,
            }}
            onChange={(e) => handleSelectChange(e)}
          />
        ) : (
          groupDetails.careerStatus
        )}
      </section>
      <br />
      <section id="About Group">
        <p className="font-bold text-slate-800 text-sm">
          About Group: 
        </p>
        {isBeingEdited ? (
          <textarea
            className="border border-slate-300"
            type="text"
            name="bio"
            placeholder="About Group"
            value={groupDetails.bio}
            onChange={handleInputChange}
          />
        ) : (
          groupDetails.bio
        )}
        <br />
      </section>
    </div>
  );
}
