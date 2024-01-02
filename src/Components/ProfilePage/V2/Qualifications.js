import React, { useEffect, useState } from "react";
import apiRequest from "../../../api";

export function Qualifications({ displayedUserId }) {
    const [userInstrumentsList, setUserInstrumentsList] = useState([]);

    useEffect(() => {
        const getUserInstrumentsInfo = async () => {
            const userInstrumentsInfo = await apiRequest.get(
                `users/${displayedUserId}/instruments`,
            );
            setUserInstrumentsList(userInstrumentsInfo.data.playedInstruments);
        };
        getUserInstrumentsInfo();
    }, [displayedUserId]);

    const qualificationRows = userInstrumentsList.map((entry) => {
        let singleQualification = '';
        if (entry.highestQualification) {
            singleQualification = entry.highestQualification.label + ' in ' + entry.instrument.label
            if (entry.qualificationInstitution) {
                singleQualification += (' from ' + entry.qualificationInstitution)
            }
        }
        return <div>{singleQualification}</div>
    })

    return (
        <section className='py-[1em]'>
            {qualificationRows.every((item) => item === '') ? null :
                <div>
                    <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">QUALIFICATIONS</h1>
                    {qualificationRows}
                </div>
            }
        </section>
    );
}