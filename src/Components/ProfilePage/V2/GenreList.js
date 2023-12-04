import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";

export function GenreList({ displayedUserId }) {
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    const getGenreInfo = async () => {
      const genreInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/genres`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setGenresList(genreInfo.data.genreInterests.map((genre) => genre.name)); // check what's in genreInfo
    };
    getGenreInfo();
  }, []);

  

  const genreText = genresList.map((genre, index) => {
    return (
      <div key={index} id={genre}>
        {genre.toUpperCase() + (index !== genresList.length - 1 ? ' / ' : '')}
        &nbsp;
      </div>
    );
  });

  

  return (
      <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em] flex flex-row justify-center">
        {genreText}
      </div>
  );
}
