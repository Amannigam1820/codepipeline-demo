import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserTripsCard = ({trip}) => {
   // console.log(trip.userSelection.location);

    const [images, setImages] = useState([]);
  const hotels = trip?.userSelection?.location;
  const hotelsArray = [hotels];
//  console.log(hotelsArray);
  
  const apiKey = "45073672-05a5a10221239372b69eebabe"//import.meta.env.VITE_PIXABAY_API_KEY; 
  //console.log(apiKey);
  // Replace with your Pixabay API key

  useEffect(() => {
    const fetchImages = async () => {
      if (hotelsArray) {
        const fetchedImages = await Promise.all(
          hotelsArray.map(async (hotel) => {
            try {
              const response = await axios.get('https://pixabay.com/api/', {
                params: {
                  key: apiKey,
                  q: hotel,
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

  console.log(images);
  return (
    <Link to={'/view-trip/'+trip.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={images || "travel.jpg"} className='object-cover rounded-xl h-[250px]'/>
        <div>
            <h2 className='font-bold text-lg'>{trip.userSelection.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip.userSelection.noOfDays} Days trip with {trip.userSelection.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripsCard