// 
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'; 
import React, { useEffect, useState } from 'react';
import { IoIosSend} from "react-icons/io";



function InfoSection({ TripData }) {
    const [photoUrl,setPhotoUrl]=useState();

    useEffect(() => {
        if (TripData?.userSelection?.location?.name) {
          GetPlacePhoto();
        }
      }, [TripData]);
    
    //   
    const GetPlacePhoto = async () => {
        const data = {
          textQuery: TripData?.userSelection?.location?.name,
        };
        try {
          const response = await GetPlaceDetails(data);
        
      
          if (response && response.data && response.data.places && response.data.places.length > 0) {
            const photoName = response.data.places[0]?.photos?.[0]?.name;
            if (photoName) {
              const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
              setPhotoUrl( PhotoUrl);
            } else {
              console.log('No photo name found.');
            }
          } else {
            console.log('No places found in response.');
          }
        } catch (error) {
          console.error('Error fetching place details:', error);
        }
      };
  return (
    <div>
      <img
        src={photoUrl}
        className="h-[340px] w-full   object-cover rounded-xl zoom-loop "
        alt="Travel"
      />
      <h2 className='bg-red-700 mt-2 rounded-2xl flex h-6 font-bold font-serif'>.Infosection.............</h2>
      <div className='flex justify-between items-center'>
      <div className="my-5 flex flex-gap gap-2">
       
        <h2 className="text-4xl font-bold text-gray-700">
          {TripData?.userSelection?.location?.name || "Unknown"}
        </h2>
        <div className="flex flex-wrap gap-4 items-center justify-start mb-6">
  <div className="flex items-center gap-2 p-2 px-4 bg-gray-100 rounded-full shadow text-gray-800 text-sm md:text-base">
    📆 <span>{TripData.userSelection?.noOFdays} Day{TripData.userSelection?.noOFdays > 1 ? 's' : ''}</span>
  </div>
  <div className="flex items-center gap-2 p-2 px-4 bg-indigo-100 rounded-full shadow text-gray-800 text-sm md:text-base">
    💰 <span>{TripData.userSelection?.budget} Budget</span>
  </div>
  <div className="flex items-center gap-2 p-2 px-4 bg-red-100 rounded-full shadow text-gray-800 text-sm md:text-base">
    🧑🏻‍🤝‍🧑🏻 <span>{TripData.userSelection?.travelPartner} Traveler{TripData.userSelection?.travelPartner > 1 ? 's' : ''}</span>
  </div>
</div>

      </div>
      <Button className='text-black shadow-lg '><IoIosSend/></Button>
      </div>
    </div>
  )
}

export default InfoSection;
// google place pohot api use for photos 