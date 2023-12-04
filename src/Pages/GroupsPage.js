import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GroupsPage = ({ motion }) => {
  const [tokenAuth, setTokenAuth] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    console.log("get token: ", TOKEN);
    setTokenAuth(TOKEN);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
        <motion.div
          className="flex flex-col w-full lg:w-[30%] justify-start text-center"
          initial={{ x: "20", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            mass: 0.4,
            damping: 8,
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">GROOVE QUARTET</h1>
            <p className="text-xl">JAZZ BAND</p>
            <p className="text-md text-gray-600">
              Currently looking for a new bassist
            </p>
          </div>

          {/* Session Clips */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">SESSION CLIPS</h2>
          </div>

          {/* About Us */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
            <p>
              A professional with 10y experience in music scene, Timmy got his
              Diploma in Performative Advocacy
            </p>
          </div>

          {/* Members */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">MEMBERS</h2>
          </div>
        </motion.div>
      </div>
    </>
  );
};
