import React, { useEffect, useState } from "react";

import axios from "axios";

export function ArtistList({ displayedUserId }) {
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    const getArtistInfo = async () => {
      const artistInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/artists`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setArtistsList(
        artistInfo.data.artistInterests.map((artist) => artist.name)
      );
    };
    getArtistInfo();
  }, [displayedUserId]);


  const artistText = artistsList.map((artist, index) => {
    return (
      <div className="" key={index} id={artist}>
        {artist.toUpperCase() + " "}
        /&nbsp;
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
          FAVOURITE ARTISTS
        </h1>  
      </div>
      <div className="flex flex-row flex-wrap text-[1.5rem] font-semibold leading-[1.2em] pr-[1em] w-[80%]">
        {artistText}
      </div>
    </div>
  );
}
