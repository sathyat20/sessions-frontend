import React, { useEffect, useState } from "react";
import axios from "axios";

export function InstrumentList({ displayedUserId }) {
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
    }, [displayedUserId]);

    return (
        <h1 className="font-bold text-[1.2rem] text-center">
            {userInstrumentsList.map((entry, index) => {
                return (
                    entry.instrument.label.toUpperCase() +
                    (index !== userInstrumentsList.length - 1 ? ' / ' : '')
                )
            })}
        </h1>
    );
}
