import React, { useEffect, useState } from "react";
import apiRequest from "../../../../api";
import {SingleInstrumentEdit} from './SingleInstrumentEdit'

export function EditInstrumentsV3({ displayedUserId }) {
  const [userInstrumentsList, setUserInstrumentsList] = useState([]);
  const [fullInstrumentsList, setFullInstrumentsList] = useState([]);
  const [instrumentListRefresh, setInstrumentListRefresh] = useState(false);

  useEffect(() => {
    const getUserInstrumentsInfo = async () => {
      const userInstrumentsInfo = await apiRequest.get(`users/${displayedUserId}/instruments`);
      setUserInstrumentsList(userInstrumentsInfo.data.playedInstruments);
    };
    const getFullInstrumentsList = async () => {
      const fullInstrumentsInfo = await apiRequest.get(`instruments/selectable`);
      setFullInstrumentsList(fullInstrumentsInfo.data);
    };
    getUserInstrumentsInfo();
    getFullInstrumentsList();
  }, []);

  useEffect(() => {
    if(instrumentListRefresh) {
    const getUserInstrumentsInfo = async () => {
      const userInstrumentsInfo = await apiRequest.get(`users/${displayedUserId}/instruments`);
      setUserInstrumentsList(userInstrumentsInfo.data.playedInstruments);
    };
    const getFullInstrumentsList = async () => {
      const fullInstrumentsInfo = await apiRequest.get(`instruments/selectable`);
      setFullInstrumentsList(fullInstrumentsInfo.data);
    };
    getUserInstrumentsInfo();
    getFullInstrumentsList();
    setInstrumentListRefresh(false)
}
  }, [instrumentListRefresh]);

  const fullQualificationsList = [
    {value:'Self Taught', label:'Self Taught'},
    {value:'Low Grade(eg ABRSM 1-5)', label:'Low Grade(eg ABRSM 1-5)'},
    {value:'High Grade(eg ABRSM 6-8)', label:'High Grade(eg ABRSM 6-8)'},
    {value:'Diploma', label:'Diploma'},
    {value:"Bachelor's degree", label: "Bachelor's degree"},
    {value:"Master's degree", label: "Master's degree"},
    {value:"Doctorate", label: "Doctorate"},
  ]

    return (
        <div>
            <hr />
            <div className="flex flex-row">
                <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
                    INSTRUMENTS
                </h1>
            </div>
            <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em]">
                {userInstrumentsList.map((entry) => {
                    return <SingleInstrumentEdit
                        key={`userInstrument-${entry.id}`}
                        userInstrument={entry}
                        fullInstrumentsList={fullInstrumentsList}
                        fullQualificationsList={fullQualificationsList}
                        setInstrumentListRefresh={setInstrumentListRefresh}
                    />
                })}
                <div className = 'flex justify-center'>
                <SingleInstrumentEdit
                    key={`userInstrument-new`}
                    userInstrument={null}
                    fullInstrumentsList={fullInstrumentsList}
                    fullQualificationsList={fullQualificationsList}
                    setInstrumentListRefresh={setInstrumentListRefresh}
                />
                </div>
            </div>
      </div>
  );
}
