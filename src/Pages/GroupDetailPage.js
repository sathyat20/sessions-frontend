import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const GroupDetailPage = () => {
  const location = useLocation();
  const { group } = location.state || {};

  // Render group details
   return (
     <div className="container mx-auto px-4">
       {/* {console.log(group)} */}
       {group ? (
         <div className="text-center">
           {/* Header */}
           <div className="mb-8">
             <h1 className="text-4xl font-bold">{group.groupName}</h1>
             <p className="text-xl">{group.ensembleType}</p>
             <p className="text-md text-gray-600">{group.careerStatus}</p>
           </div>

           {/* Session Clips */}
           <div className="mb-8">
             <h2 className="text-3xl font-bold mb-4">SESSION CLIPS</h2>
             <div className="flex justify-center">
               {group.sessionClips &&
                 group.sessionClips.map((clip, index) => (
                   <div key={index} className="w-24 h-24 mr-4 last:mr-0">
                     <img
                       src={clip.imageUrl}
                       alt="Session Clip"
                       className="w-full h-full object-cover"
                     />
                   </div>
                 ))}
             </div>
           </div>

           {/* About Us */}
           <div className="mb-8">
             <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
             <p>{group.bio}</p>
           </div>

           {/* Members */}
           <div className="mb-8">
             <h2 className="text-3xl font-bold mb-4">MEMBERS</h2>
             <div className="flex flex-wrap justify-center">
               {group.Users &&
                 group.Users.map((user, index) => (
                   <span
                     key={index}
                     className="bg-gray-200 m-2 px-4 py-2 rounded-full"
                   >
                     {user.fullName}
                   </span>
                 ))}
             </div>
           </div>
         </div>
       ) : (
         <p className="text-center">Loading group details...</p>
       )}
     </div>
   );
};

