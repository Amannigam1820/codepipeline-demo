// import { Button } from "@/components/ui/button";
// import React from "react";
// import { RiSendPlaneFill } from "react-icons/ri";

// const InfoSection = ({ tripInfo }) => {
//   //console.log(tripInfo);
//   return (
//     <div>
//       <img
//         className="h-[300px] w-full object-cover rounded-xl"
//         src="/travel.jpg"
//         alt=""
//       />
//       <div className="flex justify-between items-center">
//         <div className="my-5 flex flex-col gap-2">
//           <h2 className="font-bold text-2xl">
//             {tripInfo?.userSelection?.location}
//           </h2>
//           <div className="flex gap-5">
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md">
//               {" "}
//               📆
//               {tripInfo?.userSelection?.noOfDays} Day
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md">
//               💰
//               {tripInfo?.userSelection?.budget} Budget
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md">
//               🧑🏼‍🤝‍🧑🏼 No. of Traveler : {tripInfo?.userSelection?.traveller}
//             </h2>
//           </div>
//         </div>
//         <Button><RiSendPlaneFill /></Button>
//       </div>
//     </div>
//   );
// };

// export default InfoSection;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Button } from "@/components/ui/button";

const InfoSection = ({ tripInfo }) => {
  const [imageUrl, setImageUrl] = useState('/travel.jpg'); // Default image URL
  const location = tripInfo?.userSelection?.location;
  const apiKey = "45073672-05a5a10221239372b69eebabe"//import.meta.env.VITE_PIXABAY_API_KEY; ; // Replace with your Pixabay API key

  useEffect(() => {
    if (location) {
      const fetchImage = async () => {
        try {
          const response = await axios.get(`https://pixabay.com/api/`, {
            params: {
              key: apiKey,
              q: location,
              image_type: 'photo',
              page: 1, 
              category:"religion",
              



            },
          });
          const images = response.data.hits;
          if (images.length > 0) {
            setImageUrl(images[0].webformatURL);
          } else {
            setImageUrl('/travel.jpg'); // Fallback image
          }
        } catch (error) {
          console.error('Error fetching image from Pixabay:', error);
          setImageUrl('/travel.jpg'); // Fallback image
        }
      };

      fetchImage();
    }
  }, [location, apiKey]);

  console.log(imageUrl);

  return (
    <div>
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={imageUrl}
        alt={location || 'Travel Image'}
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripInfo?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md">
              📆 {tripInfo?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md">
              💰 {tripInfo?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md">
              🧑🏼‍🤝‍🧑🏼 No. of Traveler: {tripInfo?.userSelection?.traveller}
            </h2>
          </div>
        </div>
        <Button><RiSendPlaneFill /></Button>
      </div>
    </div>
  );
};

export default InfoSection;



