import React, { useState } from "react";
import { CategoryDropDown } from "../CategoryDropDown/CategoryDropDown";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
import {CategoryBlock} from "./CategoryBlock"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const SearchInput = ({ motion }) => {
  const [filterCriteria, setFilterCriteria] = useState({})
  const navigate = useNavigate();
  const { searchMode } = useParams();
  const STORED_CATEGORIES = {
    users: ["Name", "Instruments", "Genres", "Artists", "Qualifications", "Musicianship"],
    groups: ['Name', 'Ensemble Type', 'Musicianship', 'Genres']
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (Object.values(filterCriteria).length === 0 || Object.values(filterCriteria).some((value)=>!value)) { // need to edit this later to properly check for blanks
      alert("Please select filter criteria");
    } else {
      const savedFilterCriteria = filterCriteria;
      Object.keys(savedFilterCriteria).forEach((oldKey)=>{
        const newKey = oldKey.toLowerCase();
        savedFilterCriteria[newKey] = savedFilterCriteria[oldKey];
        delete savedFilterCriteria[oldKey];
      })
        setFilterCriteria({});
        navigate({
            pathname: `/results/${searchMode}`,
            search: `?${createSearchParams(Object.entries(savedFilterCriteria))}`
          })
    }
  };
  
  const categoryButtons = STORED_CATEGORIES[searchMode].map((category)=>{
    return (
    <button 
    className = 'p-2 rounded-lg bg-fill-secondary m-2 text-white'
    onClick = {()=>setFilterCriteria((prevState)=>{
      return {...prevState, [category]:''}
    })}>
      {category}
    </button>
    )
  })

  const categoryBlocks = Object.keys(filterCriteria).map((chosenCategory)=>{
    return (
    <CategoryBlock searchMode = {searchMode} category = {chosenCategory} filterCriteria = {filterCriteria} setFilterCriteria={setFilterCriteria}/>
    )
  })


  return (
      <div className = 'w-full '>
          <div className="flex flex-col justify-around pt-[2em] gap-[1em] h-[100%] lg:h-[45%] w-full">
          <button onClick={() => navigate(-1)}>
                  <ArrowLeftIcon class="h-6 w-6 text-gray-500" />
                </button>
          <h1 className = 'text-4xl font-bold '> {`${searchMode.slice(0,-1).toUpperCase()}`} SEARCH</h1>
          <p className = 'text-xl'>Click a category to filter:</p>
          <section className = 'flex flex-row flex-wrap justify-center flex-initial border-t-[1px] border-b-[1px] border-black'>
          {categoryButtons}      
          </section>
          <section className = ' flex-auto'>
            {categoryBlocks}
          </section>

              <div className = 'h-[10%] flex-initial'>
              <form onSubmit={handleSubmit}>
                  <input
                      type="button"
                      value="SEARCH"
                      onClick={handleSubmit}
                      className="secondary-cta-btn w-[100%] lg:w-[100%]"
                  />
              </form>
              
          </div>
          </div>

          
      </div>

  );
};
