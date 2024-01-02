import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import apiRequest from "../../../../api";

export function EditGenres({ displayedUserId }) {
  const [genresList, setGenresList] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    const getGenreInfo = async () => {
      const genreInfo = await apiRequest.get(`users/${displayedUserId}/genres`);
      setGenresList(genreInfo.data.genreInterests.map((genre) => genre.name)); // check what's in genreInfo
    };
    getGenreInfo();
  }, []);

  const writeData = async () => {
    setIsBeingEdited(false);
    await apiRequest.put(
      `users/${displayedUserId}/genres`,
      { genresList },
    );
  };

  const revertData = async () => {
    const genreInfo = await apiRequest.get(`users/${displayedUserId}/genres`);
    setIsBeingEdited(false);
    setGenresList(genreInfo.data.genreInterests.map((genre) => genre.name));
  };

  const addGenre = () => {
    if(newGenre) {
    setGenresList((prevState) => {
      prevState.push(newGenre);
      return [...prevState];
    });
    setNewGenre("");
  }
  };

  const removeGenre = (index) => {
    console.log(index);
    setGenresList((prevState) => {
      prevState.splice(index, 1);
      console.log(prevState);
      return [...prevState];
    });
  };

  const genreText = genresList.map((genre, index) => {
    return (
      <div className="flex flex-row" key={index} id={genre}>
        {genre.toUpperCase() + " "}
        {isBeingEdited ? (
          <div>
            <label for={`deleteGenre-${index}`}>
              <TrashIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
            </label>
            <button
              onClick={() => removeGenre(index)}
              id={`deleteGenre-${index}`}
              style={{ display: "none" }}
            />
          </div>
        ) : null}
        /&nbsp;
      </div>
    );
  });

  const newGenreInput = (
    <div className="flex flex-row my-[0.5em]">
      <input
        className='border border-black mr-2 font-bold'
        placeholder="Add New Genre"
        type="text"
        name="genre"
        id="name"
        size="15"
        value={newGenre}
        onChange={(e) => {
          setNewGenre(e.target.value);
        }}
      />
      <label for={`addGenre`}>
        <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
      </label>
      <button
        onClick={() => addGenre()}
        id={`addGenre`}
        style={{ display: "none" }}
      />
    </div>
  );

  return (
    <div>
    <hr />
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
          FAVOURITE GENRES
        </h1>
        <label for={`editButton-genres`}>
          { !isBeingEdited ? (
            <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          ) : null}
        </label>
        <button
          onClick={() => setIsBeingEdited(true)}
          id={`editButton-genres`}
          style={{ display: "none" }}
        />
        
      </div>
      <div className=" flex flex-row flex-wrap text-lg font-semibold leading-[1.2em]">
        {genreText}
      </div>
      {isBeingEdited ? newGenreInput : null}
      {isBeingEdited ? (
          <div className="flex flex-row py-2">
            <label for={`confirmButton-genres`}>
              <div className="flex flex-row bg-green-200 rounded-lg p-0.5 border border-black my-2 mr-2 font-bold">
                Save changes
                <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
              </div>
            </label>
            <button
              id={`confirmButton-genres`}
              style={{ display: "none" }}
              onClick={() => {
                writeData();
              }}
            />
            <label for={`rejectButton-genres`}>
              <div className="flex flex-row bg-red-200 rounded-lg p-0.5 border border-black my-2 mr-2 font-bold">
                Cancel
                <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
              </div>
            </label>
            <button
              id={`rejectButton-genres`}
              style={{ display: "none" }}
              onClick={() => {
                revertData();
              }}
            />
          </div>
        ) : null}
    </div>
  );
}
