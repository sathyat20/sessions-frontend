import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import apiRequest from "../../../../api";

export function EditArtists({ displayedUserId }) {
  const [artistsList, setArtistsList] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newArtist, setNewArtist] = useState("");

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
  }, []);

  const writeData = async () => {
    setIsBeingEdited(false);
    await apiRequest.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/artists`,
      { artistsList },
    );
  };

  const revertData = async () => {
    const artistInfo = await apiRequest.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/artists`,
    );
    setIsBeingEdited(false);
    setArtistsList(
      artistInfo.data.artistInterests.map((artist) => artist.name)
    );
  };

  const addArtist = () => {
    if(newArtist) {
    setArtistsList((prevState) => {
      prevState.push(newArtist);
      return [...prevState];
    });
    setNewArtist("");
  }
  };

  const removeArtist = (index) => {
    console.log(index);
    setArtistsList((prevState) => {
      prevState.splice(index, 1);
      console.log(prevState);
      return [...prevState];
    });
  };

  const artistText = artistsList.map((artist, index) => {
    return (
      <div className="flex flex-row" key={index} id={artist}>
        {artist.toUpperCase() + " "}
        {isBeingEdited ? (
          <div className = 'flex flex-row'>
            <label for={`deleteArtist-${index}`}>
              <TrashIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
            </label>
            <button
              onClick={() => removeArtist(index)}
              id={`deleteArtist-${index}`}
              style={{ display: "none" }}
            />
          </div>
        ) : null}
        /&nbsp;
      </div>
    );
  });

  const newArtistInput = (
    <div className="flex flex-row">
      <input
        placeholder="Artist"
        type="text"
        name="artist"
        id="name"
        size="10"
        value={newArtist}
        onChange={(e) => {
          setNewArtist(e.target.value);
        }}
      />
      <label for={`addArtist`}>
        <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
      </label>
      <button
        onClick={() => addArtist()}
        id={`addArtist`}
        style={{ display: "none" }}
      />
    </div>
  );

  return (
    <div className = 'pb-[80px]'>
    <hr />
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
          FAVOURITE ARTISTS
        </h1>
        <label for={`editButton-artists`}>
          { !isBeingEdited ? (
            <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          ) : null}
        </label>
        <button
          onClick={() => setIsBeingEdited(true)}
          id={`editButton-artists`}
          style={{ display: "none" }}
        />
        {isBeingEdited ? (
          <div className="flex flex-row">
            <label for={`confirmButton-artists`}>
              <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
            </label>
            <button
              id={`confirmButton-artists`}
              style={{ display: "none" }}
              onClick={() => {
                writeData();
              }}
            />
            <label for={`rejectButton-artists`}>
              <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
            </label>
            <button
              id={`rejectButton-artists`}
              style={{ display: "none" }}
              onClick={() => {
                revertData();
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-row flex-wrap text-lg font-semibold leading-[1.2em] w-[80%]">
        {artistText}
      </div>
      {isBeingEdited ? newArtistInput : null}
    </div>
  );
}
