import React, { useEffect, useState } from "react";
import axios from "axios";

export function Qualifications({ displayedUserId }) {
    const [userInstrumentsList, setUserInstrumentsList] = useState([]);

    useEffect(() => {
        const getUserInstrumentsInfo = async () => {
            const userInstrumentsInfo = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/instruments`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            );
            setUserInstrumentsList(userInstrumentsInfo.data.playedInstruments);
        };
        getUserInstrumentsInfo();
    }, []);

    const qualificationRows = userInstrumentsList.map((entry) => {
        let singleQualification = '';
        if (entry.highestQualification) {
            singleQualification = entry.highestQualification + ' in ' + entry.instrument.label
            if (entry.qualificationInstitution) {
                singleQualification += (' from ' + entry.qualificationInstitution)
            }
        }
        return <div>{singleQualification}</div>
    })

    return (
        <section>
        {console.log(qualificationRows)}
        {qualificationRows.every((item)=>item === '') ? null : 
        <div>
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">QUALIFICATIONS</h1>
        {qualificationRows}
        </div>
        }
        
            
        
        </section>
    );
}