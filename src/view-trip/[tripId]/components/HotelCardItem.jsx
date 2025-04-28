import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (hotel?.hotelName) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: hotel.hotelName };
    try {
      const response = await GetPlaceDetails(data);
      if (response?.data?.places?.length > 0) {
        const photoName = response.data.places[0]?.photos?.[0]?.name;
        if (photoName) {
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
          setPhotoUrl(PhotoUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching hotel photo:', error);
    }
  };

  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${hotel.hotelName || ''}, ${hotel.hotelAddress || ''}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-xl overflow-hidden hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <img
            src={photoUrl || hotel.hotelImageUrl || '/fallback-image.jpg'}
            className="rounded-xl w-full h-48 object-cover shadow-lg"
            alt={hotel.hotelName || 'Hotel Image'}
          />
          <div className="p-2 bg-white my-2 flex flex-col gap-2">
            <h2 className="font-medium text-black">{hotel.hotelName || 'Hotel Name Not Available'}</h2>
            <p className="text-sm text-gray-600">📍 {hotel.description || 'No description available'}</p>
            <p className="text-sm text-gray-600">{hotel.hotelAddress || 'No address available'}</p>
            <p className="text-sm text-black">{hotel.price || 'No price available'}</p>
            <p className="text-sm text-yellow-500">⭐ Rating: {hotel.rating || 'No rating available'}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
