import React, { useState } from "react";
import { CategoryDropDown } from "../../Components/CategoryDropDown/CategoryDropDown";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";
import {CategoryBlock} from "./CategoryBlock"

export const SearchUser = ({ motion }) => {
  const [filterCriteria, setFilterCriteria] = useState({})
  const navigate = useNavigate();


  // Axios GET Placeholders
  const categoriesList = ["Instruments", "Genres", "Artists", "Qualifications", "Musicianship"];

//c
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (Object.values(filterCriteria).length === 0 || Object.values(filterCriteria).some((value)=>!value)) { // need to edit this later to properly check for blanks
      alert("Please select filter criteria");
    } else {
      const savedFilterCriteria = filterCriteria;
        setFilterCriteria({});
        navigate({
            pathname: '/results/users',
            search: `?${createSearchParams(Object.entries(savedFilterCriteria))}`
          })
    }
  };
  
  const categoryButtons = categoriesList.map((category)=>{
    return (
    <button 
    className = 'p-2 rounded-lg bg-fill-secondary m-2 text-white'
    onClick = {()=>setFilterCriteria((prevState)=>{
      return {...prevState, [category.toLowerCase()]:''}
    })}>
      {category}
    </button>
    )
  })

  const categoryBlocks = Object.keys(filterCriteria).map((chosenCategory)=>{
    return (
    <div>
    <CategoryBlock category = {chosenCategory.toLowerCase()} filterCriteria = {filterCriteria} setFilterCriteria={setFilterCriteria}/>
    </div>
    )
  })


  return (
      <div className = 'w-full '>
      {console.log(filterCriteria)}
      {console.log('this is a test')}
      {console.log(Object.values({}).some((value)=>!value))}

          <div className="flex flex-col justify-around pt-[2em] gap-[2em] h-[100%] lg:h-[45%] w-full">
          <h1 className = 'text-4xl font-bold '> USER SEARCH</h1>
          <section className = 'flex flex-row flex-wrap justify-center flex-initial'>
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
