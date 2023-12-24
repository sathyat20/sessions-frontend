import React, { useEffect, useState } from "react";
import apiRequest from "../../../api";

export function ArtistList({ displayedUserId }) {
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    const getArtistInfo = async () => {
      const artistInfo = await apiRequest.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/artists`,
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
        {index !== artistsList.length -1 ? 
        '/'
        :null
      }
      &nbsp;
      </div>
    );
  });

  return (
    <div className = 'py-[1em]'>
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
          FAVOURITE ARTISTS
        </h1>  
      </div>
      <div className="flex flex-row flex-wrap text-lg font-semibold leading-[1.2em] w-[80%]">
        {artistText}
      </div>
    </div>
  );
}
