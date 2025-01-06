
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Hotel = ({ tripInfo }) => {
  const [images, setImages] = useState([]);
  const hotels = tripInfo?.tripData?.travel_plan?.hotels;
  console.log(hotels);
  const apiKey = "45073672-05a5a10221239372b69eebabe"//import.meta.env.VITE_PIXABAY_API_KEY; 
  //console.log(apiKey);// Replace with your Pixabay API key

  useEffect(() => {
    const fetchImages = async () => {
      if (hotels) {
        const fetchedImages = await Promise.all(
          hotels.map(async (hotel) => {
            try {
              const response = await axios.get('https://pixabay.com/api/', {
                params: {
                  key: apiKey,
                  q: hotel.name,
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

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel's recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-10'>
        {hotels?.map((hotel, index) => (
          <Link
            to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.name}
            target="_blank"
            key={index}
          >
            <div className='hover:scale-105 transition-all cursor-pointer gap-5 mt-5'>
              <img className='rounded-xl h-[200px] object-cover ' src={images[index] || '/travel.jpg'} alt={hotel?.name} />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.name}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
                <h2 className='text-sm'>💵 {hotel?.price}</h2>
                <h2>⭐{hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
