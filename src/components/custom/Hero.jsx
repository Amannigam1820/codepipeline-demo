import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {

//console.log(import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID);

  return (
    <div className="overflow-auto  flex flex-col items-center mx-56 gap-9 scroll-m-10">
      <h1 className="font-bold text-[30px] text-center mt-16">
        <span className="text-[#FF7F7F]">
          AI-Powered Travel Planning Made Easy
        </span>
        - Plan, explore, and book your next trip with cutting-edge AI
        technology.
      </h1>
      <p className="text-xl text-gray-500 text-center">Let our smart AI handle all the details, from destinations to itineraries, making your travel experience seamless and stress-free.</p>
      <Link to="/create-trip">
      <Button>Get Started, Its Free for now</Button>
      </Link>
      <div className="-mt-[30px]">
      <img className=" h-[600px] w-[600px] bg-white object-cover" src="/landing2.png" alt=""/>
      </div>
      
      
    </div>
  );
};

export default Hero;
