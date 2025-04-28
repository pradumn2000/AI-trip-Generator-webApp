
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);
  const GetPlacePhoto = async () => {
    const data = { textQuery: place.placeName }; // <-- use placeName, not placeImageUrl
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
      console.error('Error fetching place details:', error);
    }
  
  };

  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName || '')}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-xl overflow-hidden hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <img
            src={photoUrl || place.placeImageUrl || '/4K-Travel-Wallpaper-HD-Free-download.jpg'}
            className="rounded-xl w-full h-48 object-cover shadow-lg"
            alt={place.placeName || 'Place Image'}
          />
          <div className="p-2 bg-white my-2 flex flex-col gap-2">
            <h2 className="font-medium text-black">{place.placeName || 'Place Name Not Available'}</h2>
            <p className="text-sm text-gray-600">📍 {place.placeDetails || 'No description available'}</p>
            <p className="text-sm text-gray-600">{place.ticketPricing || 'No pricing info available'}</p>
            <p className="text-sm text-black">{place.travelTime || 'No travel time available'}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCardItem;

