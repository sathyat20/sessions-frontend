import React, { useState, useEffect } from "react";
import Select from "react-select";
import { XCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export const CategoryBlock = ({ searchMode, category, filterCriteria, setFilterCriteria }) => {
    const [options, setOptions] = useState([])
    const [inputText, setInputText] = useState('')

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
            musicianshipGroup: ['Amateur', 'Semi-Pro', 'Professional', 'School' ],
            'ensemble type': ['Band', 'Orchestra', 'Choir', 'Concert Band', 'Marching Band', 'Chamber Group'],
            name:''
        }
        if (category === 'Musicianship' && searchMode === 'groups') {
            setOptions(nonDatabaseOptions['musicianshipGroup'])
        } else if (category.toLowerCase() in nonDatabaseOptions) {
            setOptions(nonDatabaseOptions[category.toLowerCase()]);
        } else {
            getOptionsFromDatabase();
        }
    }, []);

    return (
        <div className='flex flex-row w-full items-center'>
            <h1 className='text-xl font-bold w-[6em]'>{category}</h1>
            {console.log(category)}
            {console.log(filterCriteria[category])}
            {options ? 
            <Select
                className='w-[10em] mx-[1em]'
                defaultValue={{ value: category, label: category }}
                size="10"
                options={options?.map((option) => {
                    return { value: option, label: option }
                })}
                value={{ value: filterCriteria[category], label: filterCriteria[category] }}
                onChange={(e) => {
                    setFilterCriteria((prevState) => {
                        return { ...prevState, [category]: e.value }
                    })
                }}
            /> :
            <input
            className = 'w-[10em] mx-[1em]'
            type="text"
            id= {`input-${category}`}
            placeholder = "Enter name"
            value = {inputText}
            onChange={(e)=>{
                setInputText(e.target.value)
                setFilterCriteria((prevState)=>{
                    return { ...prevState, [category]: e.target.value }
                })
            }}>
            </input>
            }
            <button onClick={() => setFilterCriteria((prevState) => {
                const newState = { ...prevState };
                delete newState[category];
                return newState;
            })
            }>
                <XCircleIcon className="h-6 w-6 text-slate-500 cursor-pointer" />
            </button>
        </div>
    )
}