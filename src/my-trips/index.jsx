import { db } from "@/service/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripsCard from "./component/UserTripsCard";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setuserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    setuserTrips([]);

    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setuserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };
  return <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
    <h2 className="font-bold text-3xl">My Trips</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 ">
        {
            userTrips?.length>0?userTrips.map((trip,index)=>(
                <UserTripsCard trip={trip}/>
            ))
            :[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl">


                </div>
            ))
        }
    </div>
  </div>;
};

export default MyTrips;
