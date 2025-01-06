import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ tripInfo }) => {
  console.log(tripInfo?.tripData?.travel_plan.itinerary);

  return (
    <div>
      <h2 className="font-bold text-lg">Places to visit</h2>
      <div>
        
      {tripInfo?.tripData?.travel_plan?.itinerary.length > 0 ? (
          tripInfo.tripData.travel_plan.itinerary.map((item, index) => (
            <div className="mt-5" key={index}>
              <h2 className="font-bold text-lg">{item.day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {item.plan.map((place, placeIndex) => (
                  <div key={placeIndex}>
                    <h2 className="font-md text-sm">
                      Best Time To Visit -{" "}
                      <span className="text-orange-400">
                        {place.best_time_to_visit}
                      </span>
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center">
          <h2 className="font-bold text-2xl mt-5 mx-[300px] text-gray-500">No Place to visit</h2>
           </div>
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
