import React, { useState, useEffect } from "react";
import Select from "react-select";
import { XCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export const CategoryBlock = ({ category, filterCriteria, setFilterCriteria }) => {
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState('')

    useEffect(() => {
        const getOptionsFromDatabase = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/${category.toLowerCase()}`,
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              );
              setOptions(response.data.map((entry) => entry.name));  
        }

        const nonDatabaseOptions = {
            qualifications: ['Self Taught', 'Low Grade(eg ABRSM 1-5)', 'High Grade(eg ABRSM 6-8)','Diploma', "Bachelor's degree", "Master's degree", "Doctorate"],
            musicianship: ['Amateur', 'Full-time music student', 'Semi-Pro', 'Professional', 'Educator' ],
            other: getOptionsFromDatabase(category)
        }

        if (category === 'qualifications' || category === 'musicianship') {
            setOptions(nonDatabaseOptions[category]);
        } else {
            getOptionsFromDatabase();
        }
    }, []);

    return (
        <div>
            <h1 className = 'text-2xl font-bold '>{category}</h1>
            <Select 
          defaultValue={{ value: category, label: category }}
          size="10"
          options={options.map((option)=>{
            return {value: option, label:option}
            })}
          value={filterCriteria[category]}
          onChange={(e) => {setFilterCriteria((prevState)=>{
            return {...prevState, [category]:e.value}
            })}}
        />
        <button onClick = {()=>setFilterCriteria((prevState)=>{
            const newState = {...prevState};
            delete newState[category];
            return newState;
        })
        }>
        <XCircleIcon className="h-6 w-6 text-slate-500 cursor-pointer" />
        </button>
        

        </div>
    )
}