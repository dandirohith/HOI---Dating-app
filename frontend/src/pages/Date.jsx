import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swiping from "../components/Swiping";

const Date = () => {
  const { user } = useSelector((state) => state.auth);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-[30%] border-solid border-r-2 border-white">
        <div className="flex w-full h-20 items-center justify-center border-solid border-b-2 border-white">
          <a className="text-white" href="/date-profile">
            Profile
          </a>
        </div>
      </div>
      <div className="w-full">
        <Swiping />
      </div>
    </div>
  );
};

export default Date;
