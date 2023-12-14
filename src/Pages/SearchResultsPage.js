import React, { useState, useEffect } from "react";
import {UserResult} from "../Components/SearchPage/UserResult"
import {GroupResult} from "../Components/SearchPage/GroupResult"
import {useParams, useSearchParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const SearchResultsPage = ({ motion }) => {
    let [searchParams, setSearchParams] = useSearchParams(); // see if const works later
    const[searchResults, setSearchResults] = useState([]);
    const[userId, setUserId] = useState(null);
    const { searchMode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getResults = async () => {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${searchMode}/search`,
          {
            headers: { Authorization: localStorage.getItem("token") },
            params: searchParams 
          } 
          )
          setUserId(response.data.userId)
          setSearchResults(response.data.results)
        }
        getResults()
      }, [])

      const displayedResults = searchResults.map((result)=>{
        if (searchMode==='users'){
            return <UserResult result={result} userId={userId} />
        } else if (searchMode === 'groups') {
            return <GroupResult result={result} />
        }
        // //display either userResult or groupResult  in their own components
        // if (result.id === userId) {return;}
        // else {
        //     return (
        //         <div
        //             className="flex flex-row p-[0.5em] bg-white text-black border-[1px] border-slate-300 rounded-md shadow-md overflow-hidden hover:cursor-pointer scale-100 transition-all active:scale-95 mb-[1em]"
        //             onClick={() => {
        //                 navigate(`/userprofile/${result.id}`)
        //             }}
        //             id={`searchresult-${result.id}`}
        //         >
        //             <div className="flex flex-col justify-center pr-2">
        //                 <div className="w-[6em] h-[6em] aspect-square items-center rounded-full overflow-hidden bg-white">
        //                     <img
        //                         src={result.profilePictureUrl}
        //                         className="object-cover h-full w-full"
        //                         alt="your next star player"
        //                     />
        //                 </div>
        //             </div>

        //             <div className="flex flex-col pl-[1em] h-[100%] pt-[3%]">
        //                 <p className="font-bold text-[1.5rem]">
        //                     {result.fullName}
        //                 </p>
        //                 <p className="text-slate-400 leading-0">
        //                     {result.careerStatus}
        //                 </p>
        //                 {/* <p className="font-semibold">{user.instruments[0].name}</p> */}
        //             </div>
        //         </div>
        //     )
        // }
        
      })

      return (
        <div className="flex flex-row justify-center h-[93dvh] pt-[2em] pb-[4em] px-[1em] w-full overflow-y-auto">
          <div className="flex flex-col pt-[2em] mb-[-10em] w-full">
        {console.log(searchResults)}
        <section>
        <button onClick={() => navigate(-1)}>
                  <ArrowLeftIcon class="h-6 w-6 text-gray-500" />
                </button>
                </section>
                <section className = 'py-2 flex flex-initial justify-center'>
                <p className = 'text-3xl font-bold text-center text-txtcolor-primary'>SEARCH RESULTS</p>
                </section>
                <section className = 'flex flex-col flex-auto p-[1em] border-slate-300 border-[1px]'>
                {displayedResults}
                </section>
                
                </div>
                </div>
      )
}