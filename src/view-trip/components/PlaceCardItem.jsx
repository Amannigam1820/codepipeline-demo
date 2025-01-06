import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  // console.log(place);
  // const [images, setImages] = useState([]);
  // const places = place
  // console.log(places);
  
  // const apiKey = '45073672-05a5a10221239372b69eebabe'; // Replace with your Pixabay API key

  const [images, setImages] = useState([]);
  const hotels = place
  const hotelsArray = [hotels];
 //  console.log(hotelsArray);
  //console.log(hotels);
  const apiKey = "45073672-05a5a10221239372b69eebabe"//import.meta.env.VITE_PIXABAY_API_KEY; ; // Replace with your Pixabay API key

  useEffect(() => {
    const fetchImages = async () => {
      if (hotels) {
        const fetchedImages = await Promise.all(
          hotelsArray.map(async (hotel) => {
            try {
              const response = await axios.get('https://pixabay.com/api/', {
                params: {
                  key: apiKey,
                  q: hotel.place,
                  image_type: 'photo',
                  page: 1,
                  category: "places",
                },
              });
              const images = response.data.hits;
              return images.length > 0 ? images[0].webformatURL : '/travel.jpg';
            } catch (error) {
              console.error('Error fetching image from Pixabay:', error);
              return '/travel.jpg';
            }
          })
        );
        setImages(fetchedImages);
      }
    };

    fetchImages();
  }, [hotels, apiKey]);

  //console.log(images);

  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.place}target="_blank">
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-lg">
      <img
        className="w-[150px] h-[150px] rounded-xl"
        src={images}
        alt=""
      />
      <div>
        <h2 className="font-bold text-lg">{place.place}</h2>
        <p className="text-sm text-gray-400">{place.details}</p>
        <h2 className="mt-2">Time To Travel - 🕙 {place.time_to_travel}</h2>
        {/* <div className='mt-2'> 
            <Button size="sm"><FaMapLocationDot /></Button>
            </div> */}
      </div>
    </div>
    </Link>
  );
};

export default PlaceCardItem;
