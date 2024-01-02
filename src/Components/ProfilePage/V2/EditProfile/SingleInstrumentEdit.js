import React, { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import apiRequest from "../../../../api";
import Select from "react-select";

export function SingleInstrumentEdit({ userInstrument, fullInstrumentsList, fullQualificationsList, setInstrumentListRefresh}) { 
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState(userInstrument
//     { // take from userInstrument
//     id:userInstrument.id,
//     instrument: { value: userInstrument.instrument.id, label: userInstrument.instrument.label },
//     highestQualification: { value: "", label: "" },
//     qualificationInstitution: "",
//   }
  );

  const writeData = async () => {
    if (!currentInstrument) {
        alert('Please enter an instrument')
        return;
    } else if (!currentInstrument.highestQualification && currentInstrument.qualificationInstitution) {
        alert('Please enter qualification')
        return;
    }
    setIsBeingEdited(false);
    if(userInstrument){
    await apiRequest.put(
      `instruments/userInstruments/${userInstrument.id}`,
      {
        instrumentId:currentInstrument.instrument.value,
        highestQualification:currentInstrument.highestQualification.value,
        qualificationInstitution:currentInstrument.qualificationInstitution
      },
    );
    } else {
        await apiRequest.post(
            `instruments/userInstruments`,
            {
              instrumentId:currentInstrument.instrument.value,
              highestQualification:currentInstrument.highestQualification.value,
              qualificationInstitution:currentInstrument.qualificationInstitution
            },
          );
    }
    setInstrumentListRefresh(true);
  };

  const revertData = async () => {
    setIsBeingEdited(false);
    setCurrentInstrument(userInstrument ? userInstrument : null)
  };

  const removeInstrument = async () => {
    await apiRequest.delete(`instruments/userInstruments/${userInstrument.id}`);
    setInstrumentListRefresh(true);
  };

  const inputChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setCurrentInstrument((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleInstrumentChange = (e) => {
    setCurrentInstrument((prevState) => {
      return { ...prevState, instrument: e };
    });
  };

  const handleQualificationChange = (e) => {
    console.log(e)
    setCurrentInstrument((prevState) => {
      return { ...prevState, highestQualification: e };
    });
  };

    return (
        <div className='flex flex-row m-2'>
            {!isBeingEdited ?
                userInstrument ?
                    <section className='text-sm w-5/6'>
                        <div className='text-lg'>{userInstrument.instrument.label.toUpperCase()} </div>
                        {userInstrument.highestQualification.label}
                        {userInstrument.qualificationInstitution ? ' from ' + userInstrument.qualificationInstitution : null}
                    </section>
                    :
                    <>
                        <label for={`addInstrument`}>
                            <div className='flex flex-row items-center mb-[0.5em] p-[0.25em] bg-fill-primary rounded-lg '>
                                <p className='text-base pr-[0.25em] font-semibold'>Add Instrument</p>
                                <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
                            </div>
                        </label>
                        <button
                            onClick={() => setIsBeingEdited(true)}
                            id={`addInstrument`}
                            style={{ display: "none" }}
                        />
                    </>
                :
                <section className='flex flex-col text-lg'>
                    <Select // we need to figure out how to style this...
                        className='my-[0.5em]'
                        defaultValue={{ value: "Instrument", label: "Instrument" }}
                        size="10"
                        options={fullInstrumentsList}
                        value={currentInstrument ? currentInstrument.instrument : { value: "Instrument", label: "Instrument" }}
                        onChange={(e) => handleInstrumentChange(e)}
                    />

                    <Select
                        className='my-[0.5em]'
                        defaultValue={{ value: "Qualification", label: "Qualification" }}
                        size="10"
                        options={fullQualificationsList}
                        value={currentInstrument ? currentInstrument.highestQualification : { value: "Qualification", label: "Qualification" }}//need to rework this into the react select format
                        onChange={(e) => handleQualificationChange(e)}
                    />
                    <input
                        className='border border-black my-[0.5em]'
                        placeholder="Institution"
                        type="text"
                        name="institution"
                        id="qualificationInstitution"
                        size="10"
                        value={currentInstrument ? currentInstrument.qualificationInstitution : null}
                        onChange={(e) => {
                            inputChange(e);
                        }}
                    />
                    <div className="flex flex-row">
                        <label for={`writeData-${userInstrument ? userInstrument.id : 'new'}`}>
                            <div className="flex flex-row bg-green-200 rounded-lg p-0.5 shadow-md m-2 text-base font-semibold">
                                Save
                                <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
                            </div>
                        </label>
                        <button
                            id={`writeData-${userInstrument ? userInstrument.id : 'new'}`}
                            style={{ display: "none" }}
                            onClick={() => {
                                writeData();
                            }}
                        />
                        <label for={`revertData-${userInstrument ? userInstrument.id : 'new'}`}>
                            <div className="flex flex-row bg-red-200 rounded-lg p-0.5 shadow-md m-2 text-base font-semibold">
                                Cancel
                                <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                            </div>
                        </label>
                        <button
                            id={`revertData-${userInstrument ? userInstrument.id : 'new'}`}
                            style={{ display: "none" }}
                            onClick={() => {
                                revertData();
                            }}
                        />
                    </div>
                </section>
            }
            {userInstrument ? 
            <div className='flex justify-center items-center w-1/6'>
                <label for={`editButton-${userInstrument ? userInstrument.id : 'new'}`}>
                    {!isBeingEdited ? (
                        <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                    ) : null}
                </label>
                <button
                    onClick={() => setIsBeingEdited(true)}
                    id={`editButton-${userInstrument ? userInstrument.id : 'new'}`}
                    style={{ display: "none" }}
                />
                <label for={`deleteInstrument-${userInstrument ? userInstrument.id : 'new'}`}>
                    <TrashIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
                </label>
                <button
                    onClick={() => removeInstrument()}
                    id={`deleteInstrument-${userInstrument ? userInstrument.id : 'new'}`}
                    style={{ display: "none" }}
                />
            </div>
            : null }
            {console.log(currentInstrument)}
        </div>
    );
}
