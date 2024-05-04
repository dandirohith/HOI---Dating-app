import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Swiping = () => {
  const { user } = useSelector((state) => state.auth);
  const [recommendation, setRecommendation] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/date/getprofiles/${user._id}`)
      .then((res) => {
        setRecommendation(res.data);
        console.log(res.data);
        //console.log(res.data[2 * currentIndex + 1]);
        //fetch profile data of 2*currentIndex
      });
  }, [user._id]);

  if (recommendation === null) {
    return <p className="text-white">Loading...</p>; // or any other loading indicator
  }

  return (
    <div className=" flex flex-col w-full">
      <div className="flex w-full h-20 border-solid border-b-2 border-white">
        <div className="flex w-full text-white h-20 justify-center items-center">
          HOI
        </div>
        <button className="flex h-15 px-2 ml-auto border-2 border-white text-white items-center m-5">
          Filter
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-[50%] items-left border-solid border-x-8 border-t-8 border-b-[40px] border-[#191919] ">
          {recommendation[2 * currentIndex + 1] ? (
            recommendation[2 * currentIndex + 1].map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                className="w-full rounded-3xl"
                alt={`recommendation-image-${index}`}
              />
            ))
          ) : (
            <p>No recommendation found</p>
          )}
        </div>
        <div className="flex w-full">
          <div className="flex h-20 w-full text-black bg-[#cf4932] items-center justify-center text-2xl font-bold font-cutive">
            <span>Dislike</span>
          </div>
          <div className="flex h-20 w-full text-black bg-[#3fcf32] items-center justify-center text-2xl font-bold font-cutive">
            <span>Like</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swiping;
